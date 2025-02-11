import React, {useState, useContext} from "react";
import socket from "../services/socket";
import {AuthContext} from "../context/AuthContext";
import LogoutButton from "./LogoutButton";
import {useNavigate} from "react-router-dom"; // 🔥 Import du contexte d'authentification

const LoginForm = () => {
    const {setToken, setUser} = useContext(AuthContext); // 🔥 Récupère setToken et setUser du contexte
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = () => {
        console.log("📤 Tentative de connexion WebSocket...");
        socket.connect(); // 🔄 Force la connexion WebSocket

        setTimeout(() => {
            console.log("📤 Envoi de la requête de connexion :", {email, password});

            socket.emit("login", {email, password}, (response) => {
                console.log("📩 Réponse reçue du serveur :", response);

                if (response.success) {
                    console.log("✅ Connexion réussie !");
                    setToken(response.token); // 🔥 Met à jour le token dans le contexte global
                    setUser(response.user); // 🔥 Met à jour l'utilisateur connecté
                    localStorage.setItem("token", response.token);
                    navigate("/chat");
                } else {
                    console.error("❌ Échec de la connexion :", response.message);
                    setMessage(response.message);
                }
            });

            if (!socket.connected) {
                console.error("⏳ WebSocket non connecté !");
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div

                className="bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold text-center text-pink-900 mb-6">Se connecter</h2>

                {/* Champ Pseudonyme / Adresse mail */}
                <div className="mb-4">
                    <label htmlFor="mail" className="block text-sm font-medium text-pink-900 mb-1">
                        Email
                    </label>
                    <input
                        type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>

                {/* Champ Mot de passe */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-pink-900 mb-1">
                        Mot de passe *
                    </label>
                    <input
                        type="password" placeholder="Mot de passe" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>

                {/* Bouton Confirmer */}
                <button
                    onClick={login}
                    className="w-full bg-pink-300 text-pink-900 py-2 px-4 rounded-lg hover:bg-pink-400 transition"
                >
                    Confirmer
                </button>

                <LogoutButton/>

                {/* Lien pour s'inscrire */}
                <p className="text-center text-sm text-pink-900 mt-4">
                    <a href="/signup" className="underline hover:text-pink-600">S’inscrire</a>
                </p>
            </div>
            <p>{message}</p>
        </div>
    )
        ;
};

export default LoginForm;
