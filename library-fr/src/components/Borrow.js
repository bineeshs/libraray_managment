import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router-dom';


const BookPage = () => {
    const [books, setBooks] = useState([]);
    // const [newBook, setNewBook] = useState({ title: '', author: '' });

    const [selectedUser, setSelectedUser] = useState("");
    const [selectedBook, setSelectedBook] = useState("");
    const [quantity, setQuantity] = useState("");

    const [users, setUsers] = useState('');
    const [availableBooks, setAvailableBooks] = useState("");

    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle Borrow Book functionality
    const handleBorrowBook = (e) => {
        e.preventDefault();
        const borrowData = {
            user: selectedUser,
            book: selectedBook,
            quantity,
        };

        axios
            .post('http://127.0.0.1:8000/api/borrow/', borrowData)
            .then((response) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Book borrowed successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                fetchBorrowedBooks(); 
            })
            .catch((error) => {
                if (error.response) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.error,
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: "An error occurred. Please try again.",
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            });
    };

    // Fetch Borrowed Books
    const fetchBorrowedBooks = () => {
        axios
            .get('http://127.0.0.1:8000/api/borrow/')
            .then((response) => {
                setBorrowedBooks(response.data);
            })
            .catch((error) => console.error('Error fetching borrowed books:', error));
    };

    // Return Book functionality
    const handleReturnBook = (bookId) => {
        axios
            .post(`http://127.0.0.1:8000/api/return/`,{id:bookId})
            .then((response) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Book returned successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                fetchBorrowedBooks(); // Refresh the borrowed books list
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: "An error occurred while returning the book.",
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    // Search Filter for Borrowed Books
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtered Borrowed Books based on search query
    const filteredBooks = borrowedBooks.filter((book) =>
        book.book__title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.user__name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fetch Books and Users on Component Mount
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/books/')
            .then((response) => {
                setBooks(response.data);
                setAvailableBooks(response.data);
            })
            .catch((error) => console.error('Error fetching books:', error));

        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));

        fetchBorrowedBooks(); // Initial fetch of borrowed books
    }, []);

    return (
        <div className="container mt-5">
             <h1 className="text-center mb-5 text-primary">
                <Link to="/" title='HOME' style={{ textDecoration: 'none', color: 'inherit' }}>
                Borrow / Return Book Report
                </Link>
            </h1>
            

            {/* Borrow Book Form */}
            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-info text-white">
                    <h2 className="mb-0">Borrow Book</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleBorrowBook}>
                        <div className="form-row">
                            <div className="col-md-3">
                                <label htmlFor="user">Select User</label>
                                <select
                                    className="form-control-dd"
                                    id="user"
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select a user</option>
                                    {users && users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="book">Select Book</label>
                                <select
                                    className="form-control-dd"
                                    id="book"
                                    value={selectedBook}
                                    onChange={(e) => setSelectedBook(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select a book</option>
                                    {availableBooks && availableBooks.map((book) => (
                                        <option key={book.id} value={book.id}>{book.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control-dd"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-success mt-4 w-100" style={{ marginTop: '10%', marginLeft: '20%', width: '100%' }}>
                                    Borrow Book
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Borrowed Books..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '98%' }}

                />
            </div>

            {/* Borrowed Books Table */}
            <div className="table-responsive">
                <table className="table table-bordered table-hover" >
                    <thead style={{height:'50px',textAlign:'center'}}>
                        <tr>
                            <th>Book Title</th>
                            <th>Borrowed By</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:'white',height:'50px',textAlign:'center'}}>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.book__title}</td>
                                    <td>{book.user__name}</td>
                                    <td>{book.quantity}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-return btn-sm"
                                            title='Return Book'                                            
                                            onClick={() => handleReturnBook(book.id)}
                                            style={{ padding: "5px 10px", fontSize: "14px" }}
                                        >
                                            <i className="fas fa-undo"></i>
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No borrowed books found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookPage;
