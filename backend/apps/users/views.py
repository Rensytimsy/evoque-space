from django.shortcuts import render
from rest_framework import (
    decorators, permissions, status, response, authentication
)
from . import serializers, models
from rest_framework_simplejwt.views import (TokenObtainPairView)
import requests
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@decorators.api_view(["GET"])
def _get_users(request):
    try:
        user_data = serializers.UserSerilaizers(
            models.Users.objects.all(), many=True
        )
        
        return response.Response({
            "data": user_data.data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        
@decorators.api_view(["GET"])
@decorators.permission_classes([permissions.IsAuthenticated])
def _get_user_data(request):
    try:  
        return response.Response({
            "data": str(request.user.username)
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UserLogin(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        login_response = super().post(request, *args, **kwargs)
        if login_response.status_code == status.HTTP_200_OK:
            access_token = login_response.data.get("access")
            refresh_token = login_response.data.get("refresh")
            
            login_response.set_cookie(
                key="access_token",
                value=access_token,
                path="/",
                samesite="LAX",
                secure=False,
                httponly=False,
                expires="3600"
            )
            
            login_response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                path="/",
                samesite="LAX",
                secure=False,
                httponly=False,
                expires="3600"
            )
            
        return login_response
    

@csrf_exempt
@decorators.api_view(["POST"])
def _google_login(request):
    try:
        google_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={
                "Authorization": f"Bearer {request.data.get('access_token')}"
            }
        )
        google_data = google_response.json()
        email = google_data.get("email")

        user,created = models.Users.objects.get_or_create(
            email=email
        )

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        res = response.Response({
            "message": "Login successful",
            "user": google_data.get("given_name")
        }, status=status.HTTP_200_OK)
        res.set_cookie(
            key="access_token",
            value=str(access),
            samesite="Lax",
            secure=False, 
            httponly=True,
            path="/"
        )
        
        res.set_cookie(
            key="refresh_token",
            value=str(refresh),
            samesite="Lax",
            secure=False,
            httponly=True,
            path="/"
        )
        
        return res

    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    
