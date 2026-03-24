from django.shortcuts import render
from rest_framework import (
    decorators, status, permissions, response
)
from . import models, serializers
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
        category=request.data.get("category")
        
        if not all([title, price, image_file]):
            return response.Response({
                "error": "Missing required fields: title, price, and image are required"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        product = models.Products.objects.create(
            title=title,
            price=price,
            description=description,
            image=image_file ,
            category=category
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
        
        
@decorators.api_view(["GET"])
def _get_categories(request):
    try:
        category = models.Category.objects.all()
        category_serilizers = serializers.CategorySerializer(category, many=True)
        

            
        return response.Response({
            "data": category_serilizers.data,
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@decorators.api_view(["PUT"])
def _update_service(request):
    try:
        print(request.data.get("id"))
        service = models.Services.objects.filter(id=request.data.get("id")).update(**request.data)
        service_serilizers = serializers.CategorySerializer(service)
        

            
        return response.Response({
            "data": service_serilizers.data,
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@decorators.api_view(["PUT"])
def _update_product(request, id):
    try:
        product = models.Products.objects.get(id=id)
        product.title = request.data.get("title", product.title)
        product.price = request.data.get("price", product.price)
        product.description = request.data.get("description", product.description)
        product.category = request.data.get("category", product.category)
        if request.FILES.get("image"):
            product.image = request.FILES.get("image")
        product.save()
        product_serializer = serializers.ProductSerializer(product)
        return response.Response({
            "data": product_serializer.data,
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error" : str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@decorators.api_view(["DELETE"])
def _delete_product(request, id):
    try:
        product = models.Products.objects.filter(id=id).delete()
        return response.Response({
            "message": "Product deleted successfully"
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        

@decorators.api_view(["GET"])
def _get_id_param(request, id):
    try:
        return response.Response({
            "id": id
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)       