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
def _upload_product(request):
    try:
        title = request.data.get("title")
        price = request.data.get("price")
        description = request.data.get("description")
        image_file = request.FILES.get("image") 
        
        if not all([title, price, image_file]):
            return response.Response({
                "error": "Missing required fields: title, price, and image are required"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        product = models.Products.objects.create(
            title=title,
            price=price,
            description=description,
            image=image_file 
        )

        product_data = serializers.ProductSerializer(product)
        
        return response.Response({
            'data': product_data.data,
            'message': 'Product uploaded successfully'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@decorators.api_view(["GET"])
def _get_products(request):
    try:
        
        products = serializers.ProductSerializer(
            models.Products.objects.all(),
            many=True
        )
        
        return response.Response({
            "data": products.data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)       
        
    