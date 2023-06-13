from django.contrib import admin
from .models import BookStore

# Register your models here.

@admin.register(BookStore)
class BookStoreAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'image',
        'title',
        'author',
        'price',
        'description',
        'rating'
        ]
