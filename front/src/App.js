import React, { useEffect } from 'react';
import socket from './services/socket';

const App = () => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => socket.disconnect(); // Déconnexion propre
    }, []);

    return <div>Application IRC prête à être développée !</div>;
};

export default App;
