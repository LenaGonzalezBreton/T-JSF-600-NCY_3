import React, {useState, useEffect} from 'react';
import {io} from "socket.io-client";

// Connexion au serveur Socket.IO
const socket = io('http://localhost:5000');

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [currentChannel, setCurrentChannel] = useState('General');

    useEffect(() => {
        // Écoute de l'événement 'chatMessage' pour recevoir les messages
        socket.on('chatMessage', (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });

        // Nettoyage de l'écoute lors du démontage du composant
        return () => {
            socket.off('chatMessage');
        };


    }, []);

    // Fonction pour envoyer un message
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('chatMessage', message);
            setMessage('');
        }
    };

    return (
        <div
            className="relative w-full max-w-4xl h-[80vh] p-6 rounded-2xl bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/20 shadow-lg">
            <div style={{margin: '0 auto', width: '80%', textAlign: 'center'}}>
                <div className="mb-4 text-xs text-[#8C5B67] font-semibold">{currentChannel}</div>
                <div className="flex-1 overflow-y-hidden space-y-4 mb-4 h-[65vh] p-2">
                    <div className="flex-1 space-y-4 mb-4 h-[65vh] p-2">
                        {chat.map((msg, index) => (
                            <div className={`flex justify-end`}>
                                <div
                                    className={`p-3 rounded-lg text-sm shadow-md max-w-lg bg-pink-300 text-right`}>
                    <span className="block text-gray-800" key={index}>
                        {msg}
                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={sendMessage} className="absolute bottom-4 left-4 right-4 flex items-center bg-white border border-white rounded-lg px-4 py-3 shadow-md">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Entrez un message ou une commande..."
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