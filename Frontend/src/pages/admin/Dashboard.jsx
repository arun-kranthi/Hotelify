import React from 'react';

const Dashboard = () => {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Welcome, Admin</h1>
            <p className="lead">Use the sidebar to manage users and hotels.</p>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Users</h5>
                            <p className="card-text">View and manage all registered users.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Hotels</h5>
                            <p className="card-text">Create Modify and delete the hotels</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">HotelManagers</h5>
                            <p className="card-text">Create the Hotel Manager and Assign Hotel to them.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;