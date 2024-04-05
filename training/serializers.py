from rest_framework import serializers
from training.models import UserActivityLog, Activity, UserActivity
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name"]
        
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'        
        
class UserActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = UserActivity
        fields = ["id", "completed", "created_at", "updated_at", "user"]

class UserActivityLogSerializer(serializers.ModelSerializer):
    user_activity = UserActivitySerializer()
    class Meta:
        model = UserActivityLog
        fields = ["id", "score", "created_at", "started_at", "ended_at", "user_activity"]
