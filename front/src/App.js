import React, { useEffect } from 'react';
import socket from './services/socket';
import ProfileWithChat from "./ProfileWithChat";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import SignUpForm from "./SignUpForm";


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

    return (
        <Router>
            <div className="relative min-h-screen bg-[url(/public/img/bg_image.png)] bg-cover bg-center bg-no-repeat">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/chat" element={<ProfileWithChat/>}/>
                </Routes>
            </div>
        </Router>
)
    ;
};

export default App;
