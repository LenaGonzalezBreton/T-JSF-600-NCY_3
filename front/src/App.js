import React, { useContext, useEffect } from "react";
import socket from "./services/socket";
import ProfileWithChat from "./ProfileWithChat";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const App = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        socket.on("connect", () => console.log("Connected to server"));
        socket.on("disconnect", () => console.log("Disconnected from server"));
        return () => socket.disconnect();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <div className="relative min-h-screen bg-[url(/public/img/bg_image.png)] bg-cover bg-center bg-no-repeat">
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/chat" element={user ? <ProfileWithChat /> : <Navigate to="/" />} />
                        <Route path="/test" element={<ProfileWithChat />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
