from django.contrib import admin
from django.contrib.admin import ModelAdmin
from . import models

# Register your models here.
@admin.register(models.Category)
class Category(ModelAdmin):
    list_display = ["title"]
    
@admin.register(models.Services)
class Service(ModelAdmin):
    list_display = ["title", "price"]