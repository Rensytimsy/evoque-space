from django.db import models
import uuid
from cloudinary.models import CloudinaryField

# Create your models here.
class Category(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, unique=True, default=uuid.uuid4)
    title = models.CharField(max_length=50, default="")
    
    def __str__(self):
        return "{}".format(self.title)

class Services(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=100, default="")
    subtitle = models.CharField(max_length=100, default="")
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="category"
    )
    price = models.FloatField()
    description = models.TextField(max_length=500, default="")
    info = models.TextField(max_length=500, default="")
    
    def __str__(self):
        return "{} {}".format(self.title, self.subtitle)
    
class Products(models.Model):
    title = models.CharField(max_length=30, default="")
    price = models.FloatField(default=0.00)
    image = CloudinaryField('image')
    description = models.CharField(default="", max_length=500)
    products_category = (
        ("furniture" , "furniture & furnishing"),
        ("kitchen" , "Kichen Essentials"),
        ("Decor" , "Home Decor & Styling"),
        ("lighting" , "Lighting Solutions"),
        ("bathroom" , "Bathroom Acessories"),
        ("home", "Home Office & Study"),
        ("technology" , "Smart Home Technology"),
        ("floor" , "Flooring & Wall Covering"),
        ("storage", "Storage & Orginization"),
        ("security", "Saftey and Security"),
        ("cleaning", "Cleaning Supplies & Equipment"),
        ("staircase" , "Stair Case & Hallway"),
        ("surveillance" , "Cttv and access point"),
    )
    category = models.CharField(
        choices=products_category,
        default="home",
        help_text="Provide a products category",
        max_length=50
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "{}".format(self.title)