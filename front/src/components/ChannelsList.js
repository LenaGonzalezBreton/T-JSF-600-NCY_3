import React from 'react';
import { FaBaby, FaGraduationCap, FaHandHoldingHeart, FaComments, FaFemale, FaSmile } from 'react-icons/fa';

const channels = [
    { name: 'Tips Grossesse', count: 37, icon: <FaBaby /> },
    { name: 'Allaitement', count: 100, icon: <FaHandHoldingHeart /> },
    { name: 'Accouchement', count: 12, icon: <FaSmile /> },
    { name: 'Tips Éducation', count: 78, icon: <FaGraduationCap /> },
    { name: 'Aide ménagères', count: 23, icon: <FaFemale /> },
    { name: 'Only femmes discussion', count: 270, icon: <FaComments /> },
    { name: 'Gossip', count: 69, icon: <FaSmile /> },
];

const ChannelList = () => {
    return (
        <div className="relative bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/40 rounded-2xl p-6 w-80">
            <h2 className="text-lg font-bold text-[#8C5B67] mb-4 text-center">Mes channels</h2>
            <ul className="space-y-2">
                {channels.map((channel, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between p-2 bg-white bg-opacity-65 rounded-lg hover:shadow-md"
                    >
                        <div className="flex items-center space-x-2">
                            <div className="text-pink-300 text-xl">{channel.icon}</div>
                            <span className="text-[#979797]">{channel.name}</span>
                        </div>
                        <span className="text-[#979797]">{channel.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelList;
