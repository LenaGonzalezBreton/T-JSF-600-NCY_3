import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

const ProfileCard = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false); // État pour savoir si on est en mode édition
    const [editableUser, setEditableUser] = useState(user); // État pour stocker les informations modifiables

    // Gestion des champs modifiables
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Gestion du mode édition
    const toggleEditing = () => {
        if (isEditing) {
            // Action pour sauvegarder les modifications (par exemple, envoyer à une API)
            console.log('Informations enregistrées :', editableUser);
        }
        setIsEditing(!isEditing); // Alterne entre édition et affichage
    };

    return (
        <div className="relative bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/40 rounded-2xl p-6 w-80">
            {/* Bouton paramètres */}
            <button className="absolute top-4 right-4 text-[#8C5B67] hover:text-pink-950 transition">
                <FiSettings size={20} />
            </button>

            {/* Photo de profil */}
            <div className="flex flex-col items-center">
                <img
                    src={editableUser.photo}
                    alt="Photo de profil"
                    className="w-24 h-24 rounded-full mb-4 border border-white/30 shadow"
                />
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
                    Compte créé le {editableUser.creationDate}
                </p>
            </div>

            {/* Statistiques */}
            <div className="flex justify-around text-[#8C5B67] text-sm mb-6">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-lg">
                        {editableUser.friends}
                    </p>
                    <p>Amis</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-lg">
                        {editableUser.activeChannels}
                    </p>
                    <p>Canaux actifs</p>
                </div>
            </div>

            {/* Bouton Gérer le profil / Enregistrer */}
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
