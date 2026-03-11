from django.contrib import admin
from django.contrib.admin import ModelAdmin
from . import models

# Register your models here.
@admin.register(models.Products)
class Products(ModelAdmin):
    list_display = ["title", "price", "description"]