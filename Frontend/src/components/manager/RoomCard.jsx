import React from 'react';

const RoomCard = ({ room, onDelete }) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{room.type}</h5>
                    <p className="card-text">Price: ₹{room.price}</p>
                    <p className="card-text">Availability: {room.availability ? 'Yes' : 'No'}</p>
                    <p className="card-text">Features: {room.features}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(room.roomID)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;