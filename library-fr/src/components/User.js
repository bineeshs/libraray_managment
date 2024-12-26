import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const User = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });

    // Fetch the list of users from the backend
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/users/') // Adjust URL according to your backend
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Handle input changes for the new user form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle form submission to add a new user
    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) {
            alert('Please enter both name and email');
            return;
        }

        // Send the new user to the backend
        axios
            .post('http://127.0.0.1:8000/api/users/', newUser) 
            .then((response) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'User Added successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setUsers((prevUsers) => [...prevUsers, response.data]); 
                setNewUser({ name: '', email: '' }); 
            })
            .catch((error) => {
                console.log(error.response,'errr');
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

    return (
        <div className="container mt-5">
          {/* <h1 className="text-center mb-4">User Page</h1> */}
          <h1 className="text-center mb-5 text-primary">
                <Link to="/"  title='HOME' style={{ textDecoration: 'none', color: 'inherit' }}>
                User Management
                </Link>
            </h1>
    
          {/* Form to Add New User */}
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h2 className="mb-0">Add a New User</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddUser}>
                <div className="form-row">
                  <div className="col-md-4">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      placeholder="Enter user name"
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      placeholder="Enter user email"
                      required
                    />
                  </div>
                  <div className="form-group col-md-2">
                  <button type="submit" className="btn btn-success mt-3">
                  Add User
                </button>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
    
          {/* Table of Users */}
          <h2 className="text-center mb-4">Users List</h2>
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Users</h2>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead style={{height:'50px',textAlign:'center'}}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody style={{backgroundColor:'white',height:'180px',textAlign:'center'}}>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    
};

export default User;
