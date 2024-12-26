from datetime import timezone, datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from .models import Book, User, Borrowing
from .serializers import BookSerializer, UserSerializer, BorrowingSerializer





class BookListView(APIView):
    def get(self, request):

        books = Book.objects.all().exclude(int_status = 0)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        if serializer.errors:
            for field, errors in serializer.errors.items():
                for error in errors:
                    print(f"Field '{field}' error: {error}")
                    return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)
                
    def put(self, request):
        try:
            book = Book.objects.get(pk=request.data.get('id'))
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            
            book = Book.objects.get(pk=request.data.get('id'))
            if book:
                Book.objects.filter(id=request.data.get('id')).update(int_status = 0)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        
        
        return Response({'message': 'Book deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        
        if serializer.errors:
            for field, errors in serializer.errors.items():
                for error in errors:
                    print(f"Field '{field}' error: {error}")
                    return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)

class BorrowBookView(APIView):
    def get(self, request):
        try:
            
            ins_borrow = Borrowing.objects.filter(quantity__gte = 1).values('user__name','book__title','quantity','id','borrow_date','return_date')           
            if ins_borrow:
                for item in ins_borrow:                   
                    if item['borrow_date']:
                        item['borrow_date'] = item['borrow_date'].strftime('%d-%m-%Y')
                    if item['return_date']:
                        item['return_date'] = item['return_date'].strftime('%d-%m-%Y')
                return Response(ins_borrow)
            else:
                return Response([])

        except:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request):        
        user_id = request.data.get('user')
        book_id = request.data.get('book')
        quantity = request.data.get('quantity')

        try:
            user = User.objects.get(id=user_id)
            book = Book.objects.get(id=book_id)
            if book.quantity > 0 and int(quantity) <= book.quantity:
                book.quantity -= int(quantity)
                book.save()

                borrowing = Borrowing.objects.create(user=user, book=book, quantity = quantity)
                return Response({'message': 'Book borrowed successfully.'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Book quantity not available.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)
        
    

class ReturnBookView(APIView):
    def post(self, request):
        borrowing_id = request.data.get('id')

        try:
            borrowing = Borrowing.objects.get(id=borrowing_id, return_date__isnull=True)
            borrowed_qty = borrowing.quantity
            borrowing.return_date = datetime.now()
            borrowing.quantity = 0

            borrowing.save()

            book = borrowing.book
            book.quantity += int(borrowed_qty)
            book.save()

            return Response({'message': 'Book returned successfully.'}, status=status.HTTP_200_OK)
        except Borrowing.DoesNotExist:
            return Response({'error': 'Borrowing record not found or already returned.'}, status=status.HTTP_404_NOT_FOUND)
        



class ReportBookView(APIView):
    def get(self, request):
        try:
            
            ins_borrow = Borrowing.objects.values('user__name','book__title','quantity','id','borrow_date','return_date')           
            if ins_borrow:
                for item in ins_borrow:                   
                    if item['borrow_date']:
                        item['borrow_date'] = item['borrow_date'].strftime('%d-%m-%Y')
                    if item['return_date']:
                        item['return_date'] = item['return_date'].strftime('%d-%m-%Y')
                return Response(ins_borrow)
            else:
                return Response([])

        except:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)
