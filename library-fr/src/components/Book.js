import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Book = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', quantity: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editBookId, setEditBookId] = useState(null);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/books/')
            .then((response) => {
                const booksData = response.data;
                setBooks(booksData);
            })
            .catch((error) =>
                console.error('There was an error fetching the books:', error)
            );
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleAddBook = (e) => {
        e.preventDefault();
        if (!newBook.title || !newBook.author || !newBook.quantity) {
            alert('Please enter title, author, and quantity');
            return;
        }
        const updatedBook = { ...newBook, id: editBookId };

        if (isEditing) {
            // Update API call
            axios
                .put(`http://127.0.0.1:8000/api/books/`, updatedBook)
                .then((response) => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Book updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });
                    setBooks((prevBooks) =>
                        prevBooks.map((book) =>
                            book.id === editBookId ? response.data : book
                        )
                    );
                    setIsEditing(false);
                    setNewBook({ title: '', author: '', quantity: '' });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response?.data?.error || 'An error occurred.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                });
        } else {
            // Add API call
            axios
                .post('http://127.0.0.1:8000/api/books/', newBook)
                .then((response) => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Book added successfully',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    });
                    setBooks((prevBooks) => [...prevBooks, response.data]);
                    setNewBook({ title: '', author: '', quantity: '' });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response?.data?.error || 'An error occurred.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                });
        }
    };

    const handleUpdate = (id) => {
        const bookToEdit = books.find((book) => book.id === id);
        setNewBook(bookToEdit); // Populate form with the selected book's data
        setIsEditing(true);
        setEditBookId(id);
    };

    const handleDelete = (id) => {
        console.log(id,'iddd');
        // const data = {'id':id}
        axios
        .delete(`http://127.0.0.1:8000/api/books/`, {
            data: { id: id }, 
        })
            .then(() => {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Book has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Could not delete the book.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5 text-primary">
                <Link to="/" title="HOME" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Book Management
                </Link>
            </h1>

            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-info text-white">
                    <h2 className="mb-0">{isEditing ? 'Edit Book' : 'Add a New Book'}</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleAddBook}>
                        <div className="form-row">
                            <div className="col-md-3">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter book title"
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    name="author"
                                    value={newBook.author}
                                    onChange={handleInputChange}
                                    placeholder="Enter author name"
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    value={newBook.quantity}
                                    onChange={handleInputChange}
                                    placeholder="Enter book quantity"
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-success mt-3">
                                    {isEditing ? 'Update Book' : 'Add Book'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Books List</h2>
                </div>
                <div className="card-body">
                    <table className="w-full table table-striped table-hover">
                        <thead style={{ height: '50px', textAlign: 'center' }}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: 'white', height: '200px', textAlign: 'center' }}>
                            {books.map((book,index) => (
                                <tr key={book.id}>
                                    <td>{index + 1}</td>
                                    <td><strong>{book.title}</strong></td>
                                    <td><em>{book.author}</em></td>
                                    <td>{book.quantity}</td>
                                    <td>
                                        <button
                                            className="Cust-btn btn-info btn-sm"
                                            onClick={() => handleUpdate(book.id)}
                                            title="Update Book"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                             className="Cust-btn btn-danger btn-sm ml-2"
                                             onClick={() => handleDelete(book.id)}
                                             title="Delete Book"
                                        >
                                            <i className="fas fa-trash" style={{ color: 'red' }}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Book;
