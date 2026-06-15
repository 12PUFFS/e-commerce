from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'price', 'category', 'status', 'gender', 'brand']
    list_filter = ['category', 'status', 'gender', 'brand']
    search_fields = ['title', 'brand']
    list_editable = ['price', 'status']
    list_per_page = 20