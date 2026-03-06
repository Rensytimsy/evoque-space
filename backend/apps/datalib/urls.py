from django import urls
from . import views

urlpatterns = [
    urls.path("test/", views.test_endpoint, name="test_enpoint")
]