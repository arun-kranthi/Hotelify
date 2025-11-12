import { jwtDecode } from "jwt-decode";

const decodeToken = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("jwt");
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const getUserIdFromToken = () => {
    const decoded = decodeToken();
    if (!decoded) return null;
    return decoded.sub ? decoded.sub.toString() : null;
};
