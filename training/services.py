from django.contrib.auth.models import User
from onboarding_test.exceptions import NotFoundException, ForbiddenException
from training.models import Activity, UserActivity, UserActivityLog, do_training
from .serializers import ActivitySerializer, UserActivityLogSerializer
from django.utils import timezone

def logged_user() -> User: 
    return User.objects.get(id=3)

class ActivityService:
    def retrieve_activities(self, request) -> dict:
        if request.user.is_staff:
            activity_list = Activity.objects.all() 
        else:
            activity_list = Activity.objects.filter(is_active=True)
        return ActivitySerializer(activity_list, many=True).data
    
    def retrieve_activity(self, request, id) -> dict:
        try:
            activity = Activity.objects.get(id=id)
        except Activity.DoesNotExist:
            raise NotFoundException("Activity not found")
        if request.user.is_staff:
            return ActivitySerializer(activity).data
        if not activity.is_active:
            raise NotFoundException(f"Activity with id {id} not found")
        return ActivitySerializer(activity).data
        
    
    def delete_activity(self, request, id) -> bool:
        try:
            activity = Activity.objects.get(id=id)
        except Activity.DoesNotExist:
            raise NotFoundException("Activity not found")
        if request.user.is_staff:
            activity.delete()
            return True
        raise ForbiddenException("Only staff members can delete activities")
    
class UserActivityLogService():

    def retrieve_user_activity_log(self, request, activity_id) -> dict:
        try:
            user_activity_log = UserActivityLog.objects.get(user_activity__user=request.user, user_activity__activity__id=activity_id)
            activity = user_activity_log.user_activity.activity
            if user_activity_log.user_activity.user == request.user or request.user.is_staff:
                return {"activity": ActivitySerializer(activity).data, 
                   "user_log": UserActivityLogSerializer(user_activity_log).data}
        except UserActivityLog.DoesNotExist:
            activity = Activity.objects.get(id=activity_id)
            return {"activity": ActivitySerializer(activity).data, 
                   "user_log": None}
        
        raise ForbiddenException("You can access only your activities")

    def retrieve_user_activity_logs(self, request) -> list:
        try:
            activities = Activity.objects.all()
            log = UserActivityLog.objects.filter(user_activity__user=request.user)
            log_list = []
            for activity in activities:
                try:
                    log = UserActivityLog.objects.get(user_activity__user=request.user, user_activity__activity=activity)
                    log = UserActivityLogSerializer(log).data
                except UserActivityLog.DoesNotExist:
                    log = None
                log_list.append({
                    "activity": ActivitySerializer(activity).data,
                    "user_log": log
                })
            return log_list
        except UserActivity.DoesNotExist:
            raise NotFoundException
        

class TrainingService():
    MAX_SCORE = 500

    def train_activity(self, request, activity_id) -> dict:
        if Activity.objects.get(id=activity_id).is_not_active():
            raise ForbiddenException("Activity is not active for training")
        if self.user_has_trained(request.user, activity_id):
            user_activity = UserActivity.objects.get(user=request.user, activity__id=activity_id)
            user_activity_log = UserActivityLog.objects.get(user_activity__id=user_activity.id)
        else:
            user_activity = UserActivity.objects.create(
                user=request.user,
                activity=Activity.objects.get(id=activity_id, is_active=True)
            )
            user_activity_log = UserActivityLog.objects.create(user_activity=user_activity, score=0)
        if self.training_is_complete(user_activity_log):
            user_activity_log.updated_at = timezone.now()
            user_activity_log.save()
            return {"activity": ActivitySerializer(user_activity.activity).data,
            "user_log":UserActivityLogSerializer(user_activity_log).data}
        score = do_training()
        user_activity_log.score += score
        if self.training_is_complete(user_activity_log):
            user_activity_log.score = self.MAX_SCORE
            user_activity.completed = True
        user_activity.save()
        user_activity_log.save()
        return {"activity": ActivitySerializer(user_activity.activity).data,
            "user_log":UserActivityLogSerializer(user_activity_log).data}
        
    def user_has_trained(self, user, activity_id) -> bool:
        try:
            UserActivity.objects.get(user=user, activity__id=activity_id)
            return True
        except UserActivity.DoesNotExist:
            return False
        
    def training_is_complete(self, user_activity_log) -> bool:
        if user_activity_log.score >= self.MAX_SCORE:
            return True
        return False

class LeaderboardService():
    activity_service = ActivityService()
    
    def retrieve_leaderboard_by_activity(self, request, activity_id):
        activity = Activity.objects.get(id=activity_id)
        top_activities = UserActivityLog.objects.filter(user_activity__activity__id=activity_id).order_by('-score')[:5]
        for top_activity in top_activities:
            print(top_activity.user_activity)
        return {
            "activity": ActivitySerializer(activity).data,
            "top_users": UserActivityLogSerializer(top_activities, many=True).data
        }
    
    def retrieve_leaderboard(self, request) -> list:
        activities = Activity.objects.all()
        top_by_activity = []
        for activity in activities:
            top_by_activity.append((self.retrieve_leaderboard_by_activity(request, activity.id)))
        return top_by_activity