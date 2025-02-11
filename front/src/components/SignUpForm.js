import { useState } from "react";
import socket from "../services/socket";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const register = () => {
        console.log("📤 Tentative de connexion WebSocket...");
        socket.connect(); // 🔄 Force la connexion WebSocket

        setTimeout(() => {
            console.log("📤 Envoi de l'inscription :", { email, username, password });

            socket.emit("register", { email, username, password }, (response) => {
                console.log("📩 Réponse reçue du serveur :", response);
                setMessage(response.message);
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
                <h2 className="text-2xl font-bold text-center text-pink-900 mb-6">Créer un compte</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm text-pink-900 mb-1">Nom d'utilisateur</label>
                    <input
                        type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm text-pink-900 mb-1">Email</label>
                    <input
                        type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm text-pink-900 mb-1">Mot de passe</label>
                    <input
                        type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>
                <button
                    onClick={register}
                    className="w-full bg-pink-300 text-pink-900 py-2 px-4 rounded-lg hover:bg-pink-400 transition"
                >
                    S'inscrire
                </button>

                {/* Lien pour s'inscrire */}
                <p className="text-center text-sm text-pink-900 mt-4">
                    <a href="/" className="underline hover:text-pink-600">Se connecter</a>
                </p>
            </div>
            <p>{message}</p>
        </div>
    );
};

export default SignUpForm;
