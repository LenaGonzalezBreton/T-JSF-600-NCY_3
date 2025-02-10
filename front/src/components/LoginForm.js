import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        login(email, password, (response) => {
            setMessage(response.message);
        });
    };

    return (
        <div>
            <h2>Connexion</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Se connecter</button>
            <p>{message}</p>
        </div>
    );
};

export default LoginForm;
