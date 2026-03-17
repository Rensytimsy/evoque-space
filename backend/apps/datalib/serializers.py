from . import models
from rest_framework import serializers

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Services
        fields = "__all__"
        
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"
        
        

