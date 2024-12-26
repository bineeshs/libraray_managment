
# Mini Library Management System  

This is a Mini Library Management System that allows users to manage books, users, and borrowing/returning books. The system features a RESTful API built with Django Rest Framework (DRF) for the backend and a React.js frontend styled with HTML, CSS, and Bootstrap.  

## Features  

### Backend  
1. **Book Management**  
   - Add, view, update, delete books.  
   - Search books by title or author.  
   - Display all books with details.  

2. **User Management**  
   - Register users with unique IDs.  
   - View and search for users by name or email.  

3. **Borrowing and Returning Books**  
   - Users can borrow available books.  
   - Tracks borrow and return dates.  
   - Updates book quantity based on transactions.  

4. **Reporting**  
   - Generate a summary of:  
     - Total books available.  
     - Most borrowed books.  
     - Borrowing stats for each user.  

5. **Data Persistence**  
   - Stores all data in a database using Django ORM.  
   - Provides RESTful endpoints for CRUD operations.  

---

### Frontend  
1. **Interactive User Interface**  
   - Built with React.js, styled with HTML, CSS, and Bootstrap.  
   - Features include managing books, users, and transactions from the web interface.  

2. **Search and Filters**  
   - Search functionality for books and users.  
   - Filter borrowed books and user borrowing history.  

3. **Responsive Design**  
   - Optimized for desktop and mobile views using Bootstrap grid system.  

---

## Prerequisites  

- Python 3.9+  
- Node.js 16+  
- Django 4.2+  
- PostgreSQL or SQLite  
- npm or yarn  

---

## Installation  

### Backend Setup  

1. **Clone the Repository**  
   ```bash  
   git clone <repository-url>  
   cd mini-library-backend  
   ```  

2. **Set Up Virtual Environment**  
   ```bash  
   python -m venv venv  
   source venv/bin/activate  # On Windows: venv\Scripts\activate  
   ```  

3. **Install Dependencies**  
   ```bash  
   pip install -r requirements.txt  
   ```  

4. **Apply Migrations**  
   ```bash  
   python manage.py migrate  
   ```  

5. **Run the Development Server**  
   ```bash  
   python manage.py runserver  
   ```  

6. **Access API Documentation**  
   Navigate to `http://127.0.0.1:8000/api/docs/` to view API documentation.  

---

### Frontend Setup  

1. **Navigate to the Frontend Folder**  
   ```bash  
   cd mini-library-frontend  
   ```  

2. **Install Dependencies**  
   ```bash  
   npm install  
   ```  

3. **Start the Frontend Development Server**  
   ```bash  
   npm start  
   ```  

4. **Access the Application**  
   Open `http://localhost:3000` in your web browser.  

---


### React.js Components  

#### Pages  
- **Home**: Overview of the library system.  
- **Books**: List, add, update, or delete books.  
- **Users**: Register, view, or search users.  
- **Transactions**: Manage borrowing and returning.  
- **Reports**: View library statistics.  

#### Components  
- **Search Bar**: Search for books and users.  
- **Tables**: Display books, users, and transactions with pagination.  
- **Forms**: Add or update books and users.  

---

## Technologies Used  

- **Backend**: Django, Django Rest Framework  
- **Frontend**: React.js, HTML, CSS, Bootstrap  
- **Database**: SQLite  
- **APIs**: RESTful endpoints with JWT authentication  

---



## Contributing  

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-name`.  
3. Make your changes and commit them: `git commit -m 'Add feature-name'`.  
4. Push to the branch: `git push origin feature-name`.  
5. Submit a pull request.  

---

## License  

This project is licensed under the MIT License.  

