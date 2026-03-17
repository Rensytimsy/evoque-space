from django.db import models
import uuid
# Create your models here.
class Category(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=50, default="")
    
    def __str__(self):
        return "{}".format(self.title)

class Services(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=50, default="")
    subtitle = models.CharField(max_length=50, default="")
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="category"
    )
    price = models.FloatField()
    description = models.TextField(max_length=200, default="")
    info = models.TextField(max_length=200, default="")
    