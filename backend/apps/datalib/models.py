from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Products(models.Model):
    title = models.CharField(max_length=30, default="")
    price = models.FloatField(default=0.00)
    image = CloudinaryField('image')
    description = models.CharField(default="")
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "{}".format(self.title)