from rest_framework import serializers
from . import models

class UserSerilaizers(serializers.ModelSerializer):
    class Meta:
        model = models.Users
        fields = "__all__"