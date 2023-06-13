from rest_framework import viewsets
from .models import BookStore
from .serializers import BookStoreSeriallizer
from django.http import JsonResponse
from rest_framework.views import APIView

from rest_framework.filters import SearchFilter

# Create your views here.


class BookViewSet(viewsets.ModelViewSet):
    queryset = BookStore.objects.all()
    serializer_class = BookStoreSeriallizer

# for search functionality

    filter_backends = [SearchFilter]
    search_fields = ['^title', '^author']


# for get single item

def productDetail(request, id):
    try:
        book = BookStore.objects.get(id=id)
        serializer = BookStoreSeriallizer(book)
        return JsonResponse(serializer.data)
    except BookStore.DoesNotExist:
        return JsonResponse({'message': 'Book not found.'}, status=404)


# for search functionality

class BookSearchView(APIView):
    def get(self, request):
        title = request.query_params.get('title')
        author = request.query_params.get('author')

        books = BookStore.objects.all()

        if title:
            books = books.filter(title__icontains=title)
        if author:
            books = books.filter(author__icontains=author)

        serializer = BookStoreSeriallizer(books, many=True)
        return JsonResponse(serializer.data)


def productPriceLow(request):
    price = BookStore.objects.order_by('price')
    serializer = BookStoreSeriallizer(price,many=True)
    
    return JsonResponse(serializer.data, safe=False)

def productPriceHigh(request):
    price = BookStore.objects.order_by('-price')
    serializer = BookStoreSeriallizer(price,many=True)
    
    return JsonResponse(serializer.data, safe=False)


# from rest_framework.views import APIView
# from rest_framework.response import Response

# class BookDetailView(APIView):
#     def get(self,request,id):
#         try:
#             book = BookStore.objects.get(id=id)
#             serializer = BookStoreSeriallizer(book)
#             return Response(serializer.data)
#         except BookStore.DoesNotExist:
#             return Response({'message': 'Book not found.'}, status=404)
