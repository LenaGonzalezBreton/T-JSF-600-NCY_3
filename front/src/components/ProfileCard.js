import React, { useState, useContext, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { updateProfile } from '../services/userService';
import { AuthContext } from '../context/AuthContext';

const ProfileCard = () => {
    const { user, setUser } = useContext(AuthContext); // 🔥 Récupère l'utilisateur depuis le contexte
    const [isEditing, setIsEditing] = useState(false);
    const [editableUser, setEditableUser] = useState(null);
    const [error, setError] = useState('');

    // 🔥 Met à jour `editableUser` quand `user` est disponible
    useEffect(() => {
        if (user) {
            setEditableUser(user);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const toggleEditing = async () => {
        if (isEditing && editableUser) {
            try {
                const updated = await updateProfile(user.id, { username: editableUser.username });
                setUser(updated); // 🔥 Met à jour l'utilisateur dans `AuthContext`

                // 🔥 Notifie le WebSocket du changement
                socket.emit("updateUser", { userId: updated.id, username: updated.username });

                setError('');
            } catch (err) {
                console.error("Erreur de mise à jour :", err);
                setError(err.message);
            }
        }
        setIsEditing(!isEditing);
    };

    if (!editableUser) {
        return <div>Chargement...</div>; // 🔄 Attendre que les données soient chargées
    }

    return (
        <div className="relative bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/40 rounded-2xl p-6 w-80">
            <button className="absolute top-4 right-4 text-[#8C5B67] hover:text-pink-950 transition">
                <FiSettings size={20} />

            </button>

            <div className="flex flex-col items-center">
                {isEditing ? (
                    <input
                        type="text"
                        name="username"
                        value={editableUser.username}
                        onChange={handleInputChange}
                        className="text-xl font-bold text-center text-[#8C5B67] bg-white border-b border-[#8C5B67] rounded focus:outline-none"
                    />
                ) : (
                    <h2 className="text-xl font-bold text-[#8C5B67]">{editableUser.username}</h2>
                )}
                <p className="text-sm text-[#8C5B67] mb-4">
                    Compte créé le {new Date(editableUser.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="flex justify-around text-[#8C5B67] text-sm mb-6">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-lg">{editableUser.friends || 0}</p>
                    <p>Amis</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-lg">{editableUser.activeChannels || 0}</p>
                    <p>Canaux actifs</p>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
                onClick={toggleEditing}
                className={`w-full py-2 px-4 rounded-lg transition ${
                    isEditing
                        ? 'bg-pink-200 text-[#8C5B67] hover:bg-pink-300'
                        : 'bg-pink-200 text-[#8C5B67] hover:bg-pink-300'
                }`}
            >
                {isEditing ? 'Enregistrer' : 'Gérer le profil'}
            </button>
        </div>
    );
};

export default ProfileCard;
