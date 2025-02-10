// front/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Utilisez l'import nommé si nécessaire

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token récupéré :", token);
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Token décodé :", decoded);
                // Vérifier si le token est expiré (decoded.exp en secondes)
                if (decoded.exp * 1000 < Date.now()) {
                    console.warn("Le token est expiré.");
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    // Stocker directement l'objet décodé dans le state user
                    setUser(decoded);
                }
            } catch (error) {
                console.error("Erreur lors du décodage du token :", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
