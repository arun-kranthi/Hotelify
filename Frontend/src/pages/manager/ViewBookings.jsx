import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserIdFromToken } from "../../util/jwtHelper";
import { getBookingsByManager, cancelBooking } from "../../api/bookingApi";

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const managerId = getUserIdFromToken();
                if (!managerId) {
                    console.error("No manager ID found in token");
                    return;
                }

                // ✅ This now returns BookingResponseDtoManager
                const response = await getBookingsByManager(axiosPrivate, managerId);
                setBookings(response.data);
                setFilteredBookings(response.data);
            } catch (err) {
                console.error("Failed to fetch manager bookings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [axiosPrivate]);

    useEffect(() => {
        let filtered = [...bookings];
        if (statusFilter !== "All") {
            filtered = filtered.filter((b) => b.status === statusFilter);
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.checkInDate);
            const dateB = new Date(b.checkInDate);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredBookings(filtered);
    }, [statusFilter, sortOrder, bookings]);

    const handleCancelBooking = async (bookingID) => {
        try {
            await cancelBooking(axiosPrivate, bookingID); // ✅ backend call
            const updated = bookings.map((b) =>
                b.bookingID === bookingID ? { ...b, status: "Cancelled" } : b
            );
            setBookings(updated);
            setFilteredBookings(updated);
        } catch (err) {
            console.error("Failed to cancel booking", err);
            alert("Error cancelling booking. Please try again.");
        }
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
    };

    const handleContactUser = (userFullName) => {
        alert(`Contact initiated with ${userFullName}`);
    };

    const closeModal = () => setSelectedBooking(null);

    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed": return "primary";
            case "Cancelled": return "danger";
            default: return "dark";
        }
    };

    if (loading) return <p>Loading bookings...</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Booking Summary</h2>

            {/* Filters */}
            <div className="mb-4 d-flex flex-wrap gap-3 align-items-center">
                <label className="form-label mb-0">Filter by Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="All">All</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <label className="form-label mb-0">Sort by Check-in:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="asc">Upcoming First</option>
                    <option value="desc">Recent First</option>
                </select>
            </div>

            {/* Table */}
            <table className="table table-hover table-bordered align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Booking ID</th>
                        <th>User Name</th>
                        <th>Room No</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th className="text-end">Total Price</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center">No bookings found</td>
                        </tr>
                    ) : (
                        filteredBookings.map((b) => (
                            <tr key={b.bookingID}>
                                <td>{b.bookingID}</td>
                                <td>{b.userFullName || <span className="text-muted">N/A</span>}</td>
                                <td>{b.roomNumber || <span className="text-muted">N/A</span>}</td>
                                <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                                <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                                <td className="text-end">₹{b.totalAmount.toLocaleString()}</td>
                                <td>
                                    <span className={`badge bg-${getStatusColor(b.status)}`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="btn-group" role="group">
                                        <button
                                            className="btn btn-sm btn-outline-info"
                                            title="View Details"
                                            onClick={() => handleViewDetails(b)}
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-success"
                                            title="Contact User"
                                            onClick={() => handleContactUser(b.userFullName)}
                                        >
                                            <i className="bi bi-envelope"></i>
                                        </button>
                                        {b.status === "Confirmed" && (
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                title="Cancel Booking"
                                                onClick={() => handleCancelBooking(b.bookingID)}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {selectedBooking && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content shadow">
                            <div className="modal-header">
                                <h5 className="modal-title">Booking Details</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Booking ID:</strong> {selectedBooking.bookingID}</p>
                                <p><strong>User:</strong> {selectedBooking.userFullName || "N/A"}</p>
                                <p><strong>Room:</strong> {selectedBooking.roomNumber || "N/A"}</p>
                                <p><strong>Status:</strong> {selectedBooking.status}</p>
                                <p><strong>Check-in:</strong> {new Date(selectedBooking.checkInDate).toLocaleDateString()}</p>
                                <p><strong>Check-out:</strong> {new Date(selectedBooking.checkOutDate).toLocaleDateString()}</p>
                                <p><strong>Total:</strong> ₹{selectedBooking.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBookings;
