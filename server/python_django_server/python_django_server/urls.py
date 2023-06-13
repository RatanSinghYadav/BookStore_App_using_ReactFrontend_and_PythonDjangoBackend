from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from bookStore.views import BookViewSet,productDetail,BookSearchView,productPriceLow,productPriceHigh

from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register('books',BookViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path ('api/',include('API.apiurls')),
    path('bookstore/',include(router.urls)),
    path('bookstore/books/<int:id>',productDetail,name='detail'),
    path('bookstore/books/search/', BookSearchView.as_view(), name='book-search'),
    path('bookstore/books/asc', productPriceLow, name='low-book-price'),
    path('bookstore/books/desc', productPriceHigh, name='high-book-price')
    # path('bookstore/book/<int:id>',BookDetailView.as_view()),

]+ static (settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)
