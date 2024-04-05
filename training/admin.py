from django.contrib import admin
from .models import UserActivityLog, Activity, UserActivity

admin.site.register(Activity)
admin.site.register(UserActivity)
admin.site.register(UserActivityLog)