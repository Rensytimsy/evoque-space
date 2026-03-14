from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Products(models.Model):
    title = models.CharField(max_length=30, default="")
    price = models.FloatField(default=0.00)
    image = CloudinaryField('image')
    description = models.CharField(default="")
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
    )
    category = models.CharField(
        choices=products_category,
        default="home",
        help_text="Provide a products category"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "{}".format(self.title)