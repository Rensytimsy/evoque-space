from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
urlpatterns = [
    path("accounts/user/", views._get_user_data, name="user_accounts"),
    path("accounts/login/", views.UserLogin.as_view(), name="accounts_login"),
    path("accounts/login/token-refresh/", TokenRefreshView.as_view(), name="accounts_refresh"),
    path("accounts/google/login/", views._google_login, name="google_login"),
]