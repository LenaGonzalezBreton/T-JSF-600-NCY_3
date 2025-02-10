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
        <div>
            <h2>Inscription</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={register}>S'inscrire</button>
            <p>{message}</p>
        </div>
    );
};

export default SignUpForm;
