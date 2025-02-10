    import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { updateProfile } from '../services/userService';

const ProfileCard = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableUser, setEditableUser] = useState(user);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const toggleEditing = async () => {
        if (isEditing) {
            try {
                // Appel de l'API pour mettre à jour le profil utilisateur
                const updated = await updateProfile(user.userId, {
                    nickname: editableUser.nickname,
                    photo: editableUser.photo,
                });
                setEditableUser(updated);
                setError('');
            } catch (err) {
                console.error("Erreur de mise à jour :", err);
                setError(err.message);
            }
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="relative bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/40 rounded-2xl p-6 w-80">
            <button className="absolute top-4 right-4 text-[#8C5B67] hover:text-pink-950 transition">
                <FiSettings size={20} />
            </button>

            <div className="flex flex-col items-center">
                <img
                    src={editableUser.photo || "https://via.placeholder.com/150"}
                    alt="Photo de profil"
                    className="w-24 h-24 rounded-full mb-4 border border-white/30 shadow"
                />
                {isEditing ? (
                    <input
                        type="text"
                        name="nickname"
                        value={editableUser.nickname}
                        onChange={handleInputChange}
                        className="text-xl font-bold text-center text-[#8C5B67] bg-white border-b border-[#8C5B67] rounded focus:outline-none"
                    />
                ) : (
                    <h2 className="text-xl font-bold text-[#8C5B67]">{editableUser.nickname}</h2>
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
