from django.shortcuts import render
from rest_framework import (
    decorators, status, permissions, response
)
from . import models, serializers

# Create your views here.

@decorators.api_view(["GET"])
def test_endpoint(request):
    return response.Response({
        "message": "Hello world the api is working just find!,....."
    }, status=status.HTTP_200_OK)
    

@decorators.api_view(["POST"])
def create_service(request):
    try:
        new_service = models.Services.objects.create(
            title=request.data.get("title"),
            category=models.Category.objects.get(id=request.data.get("category")),
            info=request.data.get("info"),
            description=request.data.get("description"),
            price=request.data.get("price")
        )
        
        service_serializer = serializers.ServicesSerializer(new_service)

        return response.Response({
            "data": "service created!, {}".format(service_serializer.data)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@decorators.api_view(["POST"])
def _create_category(request):
    try:
        new_category = models.Category.objects.create(
            title=request.data.get("title")
        )
        
        category_data = serializers.CategorySerializer(
            new_category
        )

            
        return response.Response({
            "dataa": "category created! \n {}".format(category_data.data)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@decorators.api_view(["GET"])
def _get_services(request):
    try:
        services = models.Services.objects.all()
        services_serilizers = serializers.ServicesSerializer(services, many=True)
        

            
        return response.Response({
            "data": services_serilizers.data,
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)