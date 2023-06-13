from rest_framework import serializers
from .models import BookStore

class BookStoreSeriallizer(serializers.ModelSerializer):
  class Meta:
    model = BookStore
    fields = [
        'id',
        'image',
        'title',
        'author',
        'price',
        'description',
        'rating'
    ]