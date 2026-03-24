from django import urls
from . import views

urlpatterns = [
    urls.path("test/", views.test_endpoint, name="test_enpoint"),
    urls.path("new-service/", views.create_service, name="create_service"),
    urls.path("new-category/", views._create_category, name="create_category"),
    urls.path("services/", views._get_services, name="services"),
    urls.path("upload/", views._upload_product, name="upload_proudct"),
    urls.path("products/", views._get_products, name="all_products"),
    urls.path("categories/", views._get_categories, name="all_categories"),
    urls.path("update-service/", views._update_service, name="update_service"),
    urls.path("update-product/", views._update_service, name="update_product"),
]