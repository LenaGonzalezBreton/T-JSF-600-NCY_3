// front/src/components/Chatbox.js
import React, { useState, useEffect, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import socket from '../services/socket';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [currentChannel, setCurrentChannel] = useState('General');
    const username = 'VotrePseudo'; // Vous pouvez obtenir le pseudo depuis le contexte Auth si nécessaire
    const messageEndRef = useRef(null);

    useEffect(() => {
        // Lorsqu'on rejoint un canal, on peut demander à charger les messages existants (si gérés)
        socket.emit('joinChannel', currentChannel);

        // Écouter les nouveaux messages
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Écouter l'arrivée d'un nouvel utilisateur
        socket.on('userJoined', (data) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { username: 'System', text: `${data.user} a rejoint le canal ${data.channel}.`, timestamp: new Date() },
            ]);
        });

        // Nettoyer les écouteurs à la fin
        return () => {
            socket.off('newMessage');
            socket.off('userJoined');
        };
    }, [currentChannel]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;
        const messageData = {
            username,
            text: inputMessage,
            timestamp: new Date(),
            channel: currentChannel,
        };
        // Émettre l'événement d'envoi de message
        socket.emit('sendMessage', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setInputMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="overflow-hidden relative w-full max-w-4xl h-[80vh] p-6 rounded-2xl bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/20 shadow-lg">
            <div className="mb-4 text-xs text-[#8C5B67] font-semibold">{currentChannel}</div>
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 h-[65vh] p-2">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.username === username ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg text-sm shadow-md max-w-lg ${message.username === username ? 'bg-pink-300 text-right' : 'bg-white text-left'}`}>
                            {message.username !== username && (
                                <span className="block text-xs text-[#8C5B67]">{message.username}</span>
                            )}
                            <span className="block text-gray-800">{message.text}</span>
                            <small className="block text-xs text-[#8C5B67] mt-1">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </small>
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center bg-white border border-white rounded-lg px-4 py-3 shadow-md">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Entrez un message ou une commande..."
                    className="flex-1 px-3 py-2 bg-transparent outline-none text-gray-800"
                />
                <button onClick={handleSendMessage} className="text-[#8C5B67] hover:text-pink-600 transition ml-2">
                    <FiSend size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
