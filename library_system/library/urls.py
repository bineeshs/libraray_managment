from django.urls import path
from .views import BookListView, UserListView, BorrowBookView, ReturnBookView,ReportBookView


urlpatterns = [
   
    path('books/', BookListView.as_view(), name='book_list'),   
    path('users/', UserListView.as_view(), name='user_list'),
    path('borrow/', BorrowBookView.as_view(), name='borrow_book'),
    path('return/', ReturnBookView.as_view(), name='return_book'),
    path('report/', ReportBookView.as_view(), name='return_book'),
]
