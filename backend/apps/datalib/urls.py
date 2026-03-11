from django import urls
from . import views

urlpatterns = [
    urls.path("test/", views.test_endpoint, name="test_enpoint"),
    urls.path("upload/", views._upload_product, name="upload_proudct"),
    urls.path("products/", views._get_products, name="all_products")
]