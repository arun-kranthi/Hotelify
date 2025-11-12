import React from 'react';

const Dashboard = () => {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Welcome, Admin</h1>
            <p className="lead">Use the sidebar to manage users, hotels, and view reports.</p>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Users</h5>
                            <p className="card-text">View and manage all registered users.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Manage Hotel Managers</h5>
                            <p className="card-text">Assign hotel managers and oversee their access and permissions.</p>
                            <a href="/admin/manage-managers" className="btn btn-outline-primary">Go to Managers</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Reports</h5>
                            <p className="card-text">View system usage and booking statistics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;