from django.db import models

# Create your models here.

class BookStore(models.Model):
    image = models.ImageField(upload_to='books/')
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8,decimal_places=2)
    description = models.TextField()
    rating = models.FloatField()