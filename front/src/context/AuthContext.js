import { createContext, useState, useEffect } from "react";
import socket from "../services/socket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            socket.auth = { token };
            socket.connect();
        } else {
            socket.disconnect();
        }
    }, [token]);

    const login = (email, password, callback) => {
        socket.emit("login", { email, password }, (response) => {
            if (response.success) {
                setToken(response.token);
                setUser(response.user);
            }
            callback(response);
        });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        socket.disconnect();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
