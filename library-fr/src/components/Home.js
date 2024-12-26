import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'

const Home = () => {
    return (


        <div>
            <div className="page-header">
                <h1 className="display-4 mb-5 font-weight-bold text-center">
                    Welcome to the Library Management System
                </h1>
            </div>

            <div className="button-row">
                {/* Button for Book Page */}
                <Link to="/book">
                    <button className="btn btn-primary btn-lg shadow-sm hover-btn book-btn">
                        <i className="fas fa-book mr-2"></i> Go to Book Page
                    </button>
                </Link>

                {/* Button for User Page */}
                <Link to="/user">
                    <button className="btn btn-success btn-lg shadow-sm hover-btn user-btn">
                        <i className="fas fa-user mr-2"></i> Go to User Page
                    </button>
                </Link>

                {/* Button for Borrow Page */}
                <Link to="/borrow">
                    <button className="btn btn-warning btn-lg shadow-sm hover-btn borrow-btn">
                        <i className="fas fa-book-reader mr-2"></i> Borrow / Return Book
                    </button>
                </Link>

                {/* Button for Borrow Page */}
                <Link to="/report">
                    <button className="btn btn-primary btn-lg shadow-sm hover-btn borrow-btn">
                        <i className="fas fa-file mr-2 w-200"></i> Report
                    </button>
                </Link>


            </div>

        </div>
        
    );
};

export default Home;
