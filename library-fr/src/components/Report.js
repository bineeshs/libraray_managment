import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ReportPage = () => {    

    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
        .get('http://127.0.0.1:8000/api/report/')
        .then((response) => {
            setBorrowedBooks(response.data);
        })
        .catch((error) => console.error('Error fetching borrowed books:', error));

        
    }, []);
    

    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtered Borrowed Books based on search query
    const filteredBooks = borrowedBooks.filter((book) =>
        book.book__title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.user__name.toLowerCase().includes(searchQuery.toLowerCase())
    );  
   

    return (
        <div className="container mt-5">
             <h1 className="text-center mb-5 text-primary">
                <Link to="/"  title='HOME' style={{ textDecoration: 'none', color: 'inherit' }}>
                Book Report
                </Link>
            </h1>
            

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
                <table className="table table-bordered table-hover">
                    <thead style={{height:'50px',textAlign:'center'}}>
                        <tr>
                            <th>Book Title</th>
                            <th>Borrowed By</th>
                            <th>Quantity</th>
                            <th>Borrowed Date</th>
                            <th>Returned Date</th>
                        </tr>
                    </thead>
                    <tbody style={{backgroundColor:'white',height:'180px',textAlign:'center'}}>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.book__title}</td>
                                    <td>{book.user__name}</td>
                                    <td>{book.quantity}</td>
                                    <td>{book.borrow_date}</td>
                                    <td>{book.return_date}</td>
                                    

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

export default ReportPage;
