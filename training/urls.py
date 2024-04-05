from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from .views import ActivityView, UserActivityViewLog, TrainingView, LeaderboardView, getcsrf


urlpatterns = [
    # Activities
    path('activities/', ActivityView.as_view(), name='activity-list'),
    path('activities/<int:id>/', ActivityView.as_view(), name='activity-detail'),
    # User Activities
    path('user/activities/', UserActivityViewLog.as_view(), name='user-activity-list'),
    path('user/activities/<int:activity_id>/', UserActivityViewLog.as_view(), name='user-activity-detail'),
    # Training
    path("user/activities/<int:activity_id>/training/", TrainingView.as_view(), name="training"),
    # Leaderboard
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),
    path("leaderboard/<int:activity_id>/", LeaderboardView.as_view(), name="leaderboard"),
    # Csrf Token
    path('csrf_token/', getcsrf.as_view(), name='csrf_token')
]

