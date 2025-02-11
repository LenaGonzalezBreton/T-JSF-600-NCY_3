// front/src/components/ChannelsList.js
import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';

const ChannelsList = () => {
    // State pour stocker les channels récupérés depuis l'API
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/channels')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des channels');
                }
                return response.json();
            })
            .then(data => setChannels(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    return (
        <div className="relative bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/40 rounded-2xl p-6 w-80">
            <h2 className="text-lg font-bold text-[#8C5B67] mb-4 text-center">Mes channels</h2>
            <ul className="space-y-2">
                {channels.length > 0 ? (
                    channels.map((channel) => (
                        <li
                            key={channel.id} // Assure-toi que l'objet channel possède un identifiant unique
                            className="flex items-center justify-between p-2 bg-white bg-opacity-65 rounded-lg hover:shadow-md"
                        >
                            <div className="flex items-center space-x-2">
                                {/* Ici, on utilise une icône par défaut pour représenter le channel */}
                                <div className="text-pink-300 text-xl"><FaComments /></div>
                                <span className="text-[#979797]">{channel.name}</span>
                            </div>
                            {/* Optionnel : afficher d'autres infos, comme le nombre de messages */}
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500">Aucun channel trouvé.</li>
                )}
            </ul>
        </div>
    );
};

export default ChannelsList;
