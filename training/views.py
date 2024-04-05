import time
from rest_framework.views import APIView
from rest_framework import status
from onboarding_test.standard_response import CustomResponse
from .services import TrainingService, logged_user, ActivityService, UserActivityLogService, LeaderboardService
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
class ActivityView(APIView):
    activity_service = ActivityService()

    def dispatch(self, request, *args, **kwargs):
        request.user = logged_user()
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=None):  
        if id:
            activities = self.activity_service.retrieve_activity(request, id)
        else:
            activities = self.activity_service.retrieve_activities(request)
        return CustomResponse(activities, status=status.HTTP_200_OK)
            
    def delete(self, request, id):
        self.activity_service.delete_activity(request, id)
        return CustomResponse("Activity deleted successfully", status=status.HTTP_204_NO_CONTENT)
    
class UserActivityViewLog(APIView):
    activity_service = ActivityService()
    user_activity_log_service = UserActivityLogService()
    
    
    def dispatch(self, request, *args, **kwargs):
        request.user = logged_user()
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, activity_id=None):
        if activity_id:
            user_activity = self.user_activity_log_service.retrieve_user_activity_log(request, activity_id)
        else:
            user_activity = self.user_activity_log_service.retrieve_user_activity_logs(request)  
        return CustomResponse(user_activity, status=status.HTTP_200_OK)

    
@method_decorator(ensure_csrf_cookie, name="dispatch")
class TrainingView(APIView):
    training_service = TrainingService()
    def dispatch(self, request, *args, **kwargs):
        request.user = logged_user()
        return super().dispatch(request, *args, **kwargs)
     
    def get(self, request, activity_id):
        user_activity_log = self.training_service.train_activity(request, activity_id)
        time.sleep(5)
        return CustomResponse(user_activity_log, status=status.HTTP_200_OK)
    
class LeaderboardView(APIView):
    leaderboard_service = LeaderboardService()
    
    def dispatch(self, request, *args, **kwargs):
        request.user = logged_user()
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, activity_id=None):
        if activity_id:
            leaderboard_data = self.leaderboard_service.retrieve_leaderboard_by_activity(request, activity_id)
        else:
            leaderboard_data = self.leaderboard_service.retrieve_leaderboard(request)
        return CustomResponse(leaderboard_data, status=status.HTTP_200_OK)
    

@method_decorator(ensure_csrf_cookie, name="dispatch")
class getcsrf(APIView):
    def get(self, request, format=None):
        resp=CustomResponse("", status=status.HTTP_200_OK)
        return resp