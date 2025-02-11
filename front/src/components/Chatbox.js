import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext"; // 🔥 Importer le contexte

const socket = io("http://localhost:5000", {
    auth: { token: localStorage.getItem("token") }, // 🔥 Envoyer le token pour récupérer le pseudo
});

const ChatBox = () => {
    const { user } = useContext(AuthContext); // 🔥 Récupérer l'utilisateur connecté
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Écoute de l'événement 'chatMessage' pour recevoir les messages
        socket.on("chatMessage", (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });

        // Nettoyage de l'écoute lors du démontage du composant
        return () => {
            socket.off("chatMessage");
        };
    }, []);

    // Fonction pour envoyer un message
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && user) {
            console.log("📤 Envoi du message :", message);
            socket.emit("chatMessage", `${user.username}: ${message}`); // 🔥 Envoie une simple string
            setMessage("");
        } else {
            console.error("❌ Impossible d'envoyer le message : user ou message vide.");
        }
    };





    return (
        <div className="relative w-full max-w-4xl h-[80vh] p-6 rounded-2xl bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/20 shadow-lg">
            <div style={{ margin: "0 auto", width: "80%", textAlign: "center" }}>
                <div className="mb-4 text-xs text-[#8C5B67] font-semibold">Général</div>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 h-[65vh] p-2">
                    {chat.map((msg, index) => (
                        msg && typeof msg.message === "string" ? (
                            <div key={index} className={`flex ${msg.sender === user?.username ? "justify-end" : "justify-start"}`}>
                                <div className={`p-3 rounded-lg text-sm shadow-md max-w-lg ${
                                    msg.sender === user?.username ? "bg-pink-300 text-right" : "bg-gray-200 text-left"
                                }`}>
                <span className="block text-gray-800 font-bold">
                    {msg.sender ? msg.sender : "Inconnu"}
                </span>
                                    <span className="block text-gray-800">
                    {typeof msg.message === "string" ? msg.message : "Message invalide"}
                </span>
                                </div>
                            </div>
                        ) : null
                    ))}


                </div>
                <form onSubmit={sendMessage} className="absolute bottom-4 left-4 right-4 flex items-center bg-white border border-white rounded-lg px-4 py-3 shadow-md">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Entrez un message..."
                        className="flex-1 px-3 py-2 bg-transparent outline-none text-gray-800"
                    />
                    <button type="submit" className="text-[#8C5B67] hover:text-pink-600 transition ml-2">
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
