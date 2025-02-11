import { createContext, useState, useEffect } from "react";
import socket from "../services/socket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true); // 🔄 Ajout d’un état de chargement

    useEffect(() => {
        if (token) {
            console.log("🔌 WebSocket : Connexion avec token...");
            socket.auth = { token };
            socket.connect();

            console.log("🆔 Auth WebSocket avant getUser :", socket.auth);

            socket.emit("getUser", { token }, (response) => {
                console.log("📩 Réponse du serveur getUser :", response);

                if (response.success) {
                    console.log("✅ Utilisateur récupéré :", response.user);
                    setUser(response.user);
                } else {
                    console.error("❌ Erreur récupération user :", response.message);
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("token");
                }
                setLoading(false);
            });
        } else {
            console.log("🚪 WebSocket : Déconnexion...");
            setUser(null);
            socket.disconnect();
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            console.log("🆕 Mise à jour WebSocket avec user :", user.username);
            socket.auth = { userId: user.id, username: user.username };
            socket.disconnect(); // Déconnecter le socket pour éviter les conflits
            socket.connect(); // Reconnecter avec les nouvelles infos
        }
    }, [user]);


    useEffect(() => {
        if (user) {
            console.log("🆕 Mise à jour du WebSocket avec le nouvel utilisateur :", user.username);
            socket.emit("updateUser", { userId: user.id, username: user.username });
        }
    }, [user]);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        socket.disconnect();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
