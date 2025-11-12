import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUserById, updateUserById } from '../../api/adminApi';
import useAdminAxios from '../../hooks/useAdminAxios';

const ManageUsers = () => {
    const axiosAdmin = useAdminAxios();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', contactNumber: '' });

    const fetchUsers = async () => {
        try {
            const response = await axiosAdmin.get('/User/admin-only');
            setUsers(response.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch users. Please try again later.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            await deleteUserById(id);
            fetchUsers(); // Refresh list
        } catch (err) {
            console.error('Delete error:', err);

            const backendMessage = err.response?.data?.message || err.message;

            if (backendMessage.includes("active loyalty account")) {
                alert("This user has a linked loyalty account and cannot be deleted.");
            } else {
                alert("Failed to delete user.");
            }
        }
    }
};


    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber
        });
    };

    const handleUpdate = async () => {
        try {
            await updateUserById(editingUser.userID, formData);
            setEditingUser(null);
            fetchUsers(); // Refresh list
        } catch (err) {
            console.error('Update error:', err);
            alert('Failed to update user.');
        }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">Manage Users</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Contact</th>
                        <th>Actions</th> {/*  New column */}
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.userID}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.contactNumber}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Update</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.userID)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/*  Update Modal */}
            {editingUser && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update User</h5>
                                <button type="button" className="btn-close" onClick={() => setEditingUser(null)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;