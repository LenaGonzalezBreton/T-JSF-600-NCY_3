// Updated Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }
        setError('');
        navigate('/chat');
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

                {/* Champ Pseudonyme / Adresse mail */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-pink-900 mb-1">
                        Nom d'utilisateur
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Entrez votre nom d'utilisateur..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
                    />
                </div>

                {/* Champ Mot de passe */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-pink-900 mb-1">
                        Mot de passe *
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

                {/* Bouton Confirmer */}
                <button
                    type="submit"
                    className="w-full bg-pink-300 text-pink-900 py-2 px-4 rounded-lg hover:bg-pink-400 transition"
                >
                    Confirmer
                </button>

                {/* Lien pour s'inscrire */}
                <p className="text-center text-sm text-pink-900 mt-4">
                    <a href="/signup" className="underline hover:text-pink-600">S’inscrire</a>
                </p>
            </form>
        </div>
    );
};

export default Login;