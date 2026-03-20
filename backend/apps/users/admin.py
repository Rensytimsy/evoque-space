from django.contrib import admin
from django.contrib.admin import ModelAdmin
from . import models
# Register your models here.

@admin.register(models.Users)
class User(ModelAdmin):
    list_display = ["username", "email"]