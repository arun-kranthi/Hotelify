import React, { useEffect, useState } from "react";
import useAdminAxios from "../../hooks/useAdminAxios";
import {
    getAllHotels,
    getHotelById,
    addHotel,
    updateHotel,
    deleteHotel
} from "../../api/adminHotelApi";

import {
    createHotelManager,
    getAllManagers
} from "../../api/adminApi";

const ManageHotels = () => {
    const axiosPrivate = useAdminAxios();
    const [hotels, setHotels] = useState([]);
    const [managers, setManagers] = useState([]);
    const [message, setMessage] = useState("");

    // Hotel form state
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        amenities: "",
        managerId: ""
    });

    // Manager form state
    const [managerForm, setManagerForm] = useState({
        name: "",
        email: "",
        password: "",
        contactNumber: ""
    });

    // Track editing hotel
    const [editingHotel, setEditingHotel] = useState(null);

    useEffect(() => {
        fetchHotels();
        fetchManagers();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await getAllHotels(axiosPrivate);
            setHotels(response);
        } catch (err) {
            console.error("Fetch hotels error:", err);
            setMessage("Failed to fetch hotels.");
        }
    };

    const fetchManagers = async () => {
        try {
            const response = await getAllManagers(axiosPrivate);
            setManagers(response);
        } catch (err) {
            console.error("Fetch managers error:", err);
            setMessage("Failed to fetch managers.");
        }
    };

    const handleHotelChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleManagerChange = (e) =>
        setManagerForm({ ...managerForm, [e.target.name]: e.target.value });

    const handleCreateManager = async () => {
        try {
            const payload = {
                Name: managerForm.name,
                Email: managerForm.email,
                Password: managerForm.password,
                ContactNumber: managerForm.contactNumber
            };
            await createHotelManager(axiosPrivate, payload);
            setMessage("Manager created successfully!");
            fetchManagers();
            setManagerForm({ name: "", email: "", password: "", contactNumber: "" });
        } catch (err) {
            console.error("Create manager error:", err);
            setMessage("Failed to create manager.");
        }
    };

    const handleCreateHotel = async () => {
        try {
            const payload = {
                Name: formData.name,
                Location: formData.location,
                Amenities: formData.amenities,
                ManagerId: formData.managerId
            };
            await addHotel(axiosPrivate, payload);
            setMessage("Hotel created successfully!");
            fetchHotels();
            setFormData({ name: "", location: "", amenities: "", managerId: "" });
        } catch (err) {
            console.error("Create hotel error:", err);
            setMessage("Failed to create hotel.");
        }
    };

    const handleUpdateHotel = async () => {
        try {
            const payload = {
                Name: formData.name,
                Location: formData.location,
                Amenities: formData.amenities
            };
            await updateHotel(axiosPrivate, editingHotel.hotelID, payload);
            setMessage("Hotel updated successfully!");
            fetchHotels();
            setFormData({ name: "", location: "", amenities: "", managerId: "" });
            setEditingHotel(null);
        } catch (err) {
            console.error("Update hotel error:", err);
            setMessage("Failed to update hotel.");
        }
    };

    const handleDeleteHotel = async (id) => {
        try {
            const hotel = await getHotelById(axiosPrivate, id);

            if (hotel.bookings && hotel.bookings.length > 0) {
                alert("This hotel has existing bookings and cannot be deleted.");
                return;
            }

            if (window.confirm("Are you sure you want to delete this hotel?")) {
                await deleteHotel(axiosPrivate, id);
                setMessage("Hotel deleted successfully!");
                fetchHotels();
            }
        } catch (err) {
            console.error("Delete hotel error:", err);
            setMessage("Failed to delete hotel.");
        }
    };

    const startEditingHotel = (hotel) => {
        setEditingHotel(hotel);
        setFormData({
            name: hotel.name,
            location: hotel.location,
            amenities: hotel.amenities,
            managerId: hotel.managerId // preserved but not editable
        });
    };

    const cancelEditing = () => {
        setEditingHotel(null);
        setFormData({ name: "", location: "", amenities: "", managerId: "" });
    };

    return (
        <div className="container my-5">
            <h2>Manage Hotels</h2>
            {message && <div className="alert alert-info">{message}</div>}

            {/* Create Manager */}
            <h4>Create Hotel Manager</h4>
            <input type="text" name="name" placeholder="Manager Name" value={managerForm.name} onChange={handleManagerChange} className="form-control mb-2" />
            <input type="email" name="email" placeholder="Manager Email" value={managerForm.email} onChange={handleManagerChange} className="form-control mb-2" />
            <input type="password" name="password" placeholder="Manager Password" value={managerForm.password} onChange={handleManagerChange} className="form-control mb-2" />
            <input type="text" name="contactNumber" placeholder="Manager Contact Number" value={managerForm.contactNumber} onChange={handleManagerChange} className="form-control mb-2" />
            <button className="btn btn-success mb-3" onClick={handleCreateManager}>Create Manager</button>

            {/* List Managers */}
            <h4>Existing Managers</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Manager ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((m) => (
                        <tr key={m.userID}>
                            <td>{m.userID}</td>
                            <td>{m.name}</td>
                            <td>{m.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Create / Update Hotel */}
            <h4>{editingHotel ? "Update Hotel" : "Create Hotel"}</h4>
            <input type="text" name="name" placeholder="Hotel Name" value={formData.name} onChange={handleHotelChange} className="form-control mb-2" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleHotelChange} className="form-control mb-2" />
            <input type="text" name="amenities" placeholder="Amenities" value={formData.amenities} onChange={handleHotelChange} className="form-control mb-2" />

            {/* Manager dropdown only for CREATE */}
            {!editingHotel && (
                <select name="managerId" value={formData.managerId} onChange={handleHotelChange} className="form-control mb-2">
                    <option value="">Select Manager</option>
                    {managers.map((m) => (
                        <option key={m.userID} value={m.userID}>
                            {m.name} ({m.email})
                        </option>
                    ))}
                </select>
            )}

            {editingHotel ? (
                <>
                    <button className="btn btn-warning mb-3 me-2" onClick={handleUpdateHotel}>Update Hotel</button>
                    <button className="btn btn-secondary mb-3" onClick={cancelEditing}>Cancel</button>
                </>
            ) : (
                <button className="btn btn-primary mb-3" onClick={handleCreateHotel}>Create Hotel</button>
            )}

            {/* List Hotels */}
            <h4>Existing Hotels</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Hotel ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Amenities</th>
                        <th>Manager ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((h) => (
                        <tr key={h.hotelID}>
                            <td>{h.hotelID}</td>
                            <td>{h.name}</td>
                            <td>{h.location}</td>
                            <td>{h.amenities}</td>
                            <td>{h.managerId}</td>
                                                       <td>
                                <button 
                                    className="btn btn-sm btn-info me-2" 
                                    onClick={() => startEditingHotel(h)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-sm btn-danger" 
                                    onClick={() => handleDeleteHotel(h.hotelID)}
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

export default ManageHotels;
