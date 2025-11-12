import React, { useEffect, useState } from "react";
import useAdminAxios from "../../hooks/useAdminAxios";
import {
    getRoomsByHotel,
    deleteRoom,
    updateRoom,
    createRoom,
} from "../../api/roomApi";
import { getHotelsByManager } from "../../api/hotelApi";
import { getUserIdFromToken } from "../../util/jwtHelper";

const ManageRooms = () => {
    const axiosPrivate = useAdminAxios();
    const [rooms, setRooms] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [formData, setFormData] = useState({
        hotelID: "",
        type: "",
        price: "",
        availability: true,
        features: "",
    });
    const [editingRoom, setEditingRoom] = useState(null);
    const [message, setMessage] = useState("");

    const managerId = getUserIdFromToken();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                if (managerId) {
                    const data = await getHotelsByManager(axiosPrivate, managerId);
                    setHotels(data);
                }
            } catch (err) {
                console.error("Failed to fetch hotels:", err);
            }
        };
        fetchHotels();
    }, [axiosPrivate, managerId]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                if (formData.hotelID) {
                    const data = await getRoomsByHotel(axiosPrivate, formData.hotelID);
                    setRooms(data);
                }
            } catch (err) {
                console.error("Failed to fetch rooms:", err);
            }
        };
        fetchRooms();
    }, [axiosPrivate, formData.hotelID]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const payload = {
                ...formData,
                managerId,
            };

            if (editingRoom) {
                await updateRoom(axiosPrivate, editingRoom.roomID, payload);
                setMessage("Room updated successfully!");
            } else {
                await createRoom(axiosPrivate, payload);
                setMessage("Room added successfully!");
            }

            setFormData({
                hotelID: formData.hotelID,
                type: "",
                price: "",
                availability: true,
                features: "",
            });
            setEditingRoom(null);

            const refreshed = await getRoomsByHotel(axiosPrivate, formData.hotelID);
            setRooms(refreshed);
        } catch (err) {
            console.error("Save error:", err);
            setMessage("Failed to save room. Check console.");
        }
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
        setFormData({
            hotelID: room.hotelID,
            type: room.type,
            price: room.price,
            availability: room.availability,
            features: room.features,
        });
    };

    const handleDelete = async (roomID) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                const response = await deleteRoom(axiosPrivate, roomID);
                setMessage(response);
                const refreshed = await getRoomsByHotel(axiosPrivate, formData.hotelID);
                setRooms(refreshed);
            } catch (err) {
                alert(err.response?.data || "Failed to delete room.");
            }
        }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">{editingRoom ? "Update Room" : "Add Room"}</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="mb-4">
                <select
                    name="hotelID"
                    className="form-control mb-2"
                    value={formData.hotelID}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Hotel</option>
                    {hotels.map((hotel) => (
                        <option key={hotel.hotelID} value={hotel.hotelID}>
                            {hotel.name} ({hotel.location})
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="type"
                    className="form-control mb-2"
                    placeholder="Room Type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    className="form-control mb-2"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="features"
                    className="form-control mb-2"
                    placeholder="Features"
                    value={formData.features}
                    onChange={handleChange}
                    required
                />
                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        name="availability"
                        className="form-check-input"
                        checked={formData.availability}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Available</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingRoom ? "Update Room" : "Add Room"}
                </button>
            </form>

            <h3>All Rooms</h3>
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Features</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room.roomID}>
                            <td>{room.type}</td>
                            <td>₹{room.price}</td>
                            <td>{room.availability ? "Yes" : "No"}</td>
                            <td>{room.features}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEdit(room)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(room.roomID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRooms;
