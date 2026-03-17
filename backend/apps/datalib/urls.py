from django import urls
from . import views

urlpatterns = [
    urls.path("test/", views.test_endpoint, name="test_enpoint"),
    urls.path("new-service/", views.create_service, name="create_service"),
    urls.path("new-category/", views._create_category, name="create_category"),
    urls.path("services/", views._get_services, name="services"),
]