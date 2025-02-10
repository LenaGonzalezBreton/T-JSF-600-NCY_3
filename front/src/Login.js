// front/src/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './services/authService';
import { AuthContext } from './context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }
        try {
            const data = await login(formData.email, formData.password);
            localStorage.setItem('token', data.token);
            // On redirige vers /chat, et l'AuthContext récupérera le token au prochain montage
            navigate('/chat');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold text-center text-pink-900 mb-6">Se connecter</h2>
                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                {/* Champ Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-pink-900 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Entrez votre email..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>

                {/* Champ Mot de passe */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-pink-900 mb-1">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Entrez votre mot de passe..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-300 text-pink-900 py-2 px-4 rounded-lg hover:bg-pink-400 transition"
                >
                    Confirmer
                </button>

                <p className="text-center text-sm text-pink-900 mt-4">
                    <a href="/signup" className="underline hover:text-pink-600">S’inscrire</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
