import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import socket from "./services/socket";
import ProfileWithChat from "./ProfileWithChat";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./components/ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";

const App = () => {
    useEffect(() => {
        socket.on("connect", () => console.log("Connected to server"));
        socket.on("disconnect", () => console.log("Disconnected from server"));
        return () => socket.disconnect();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <div
                    className="relative min-h-screen bg-[url(/public/img/bg_image.png)] bg-cover bg-center bg-no-repeat">
                    <Routes>
                        <Route path="/" element={<LoginForm/>}/>
                        <Route path="/signup" element={<SignUpForm/>}/>
                        <Route path="/test" element={<ProfileWithChat/>}/>
                        <Route
                            path="/chat"
                            element={

                                <ProfileWithChat/>

                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
