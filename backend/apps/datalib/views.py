from django.shortcuts import render
from rest_framework import (
    decorators, status, permissions, response
)

# Create your views here.

@decorators.api_view(["GET"])
def test_endpoint(request):
    return response.Response({
        "message": "Hello world the api is working just find!,....."
    }, status=status.HTTP_200_OK)