import React, {useContext, useEffect} from 'react';
import socket from './services/socket';
import ProfileWithChat from "./ProfileWithChat";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./Login";
import SignUpForm from "./SignUpForm";
import {AuthContext} from './context/AuthContext'; // Vérifie le chemin

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

    const {user} = useContext(AuthContext);

    return (
        <Router>
            <div className="relative min-h-screen bg-[url(/public/img/bg_image.png)] bg-cover bg-center bg-no-repeat">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/chat" element={ user ? <ProfileWithChat /> : <Navigate to="/" /> } />
                </Routes>
            </div>
        </Router>
    );
   // <Route path="/chat" element={ user ? <ProfileWithChat /> : <Navigate to="/" /> } />

};

export default App;
