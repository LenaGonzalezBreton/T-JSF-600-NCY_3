// front/src/ProfileWithChat.js
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ProfileCard from './components/ProfileCard';
import ChatBox from './components/Chatbox';
import ChannelList from './components/ChannelsList';
import BottomChannelList from './components/PrivateChannels';
import ConnectedUsersList from './components/ConnectedUsers';

const ProfileWithChat = () => {
    const { user } = useContext(AuthContext);

    // Si l'utilisateur n'est pas encore chargé, affichez un loader
    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="relative flex flex-col lg:flex-row min-h-screen w-full">
            {/* Section gauche avec la carte de profil et la liste des channels */}
            <div className="flex flex-col lg:w-1/4 p-4 space-y-4 w-full max-w-sm mx-auto lg:mx-0">
                <ProfileCard user={user} />
                <ChannelList />
            </div>

            <LogoutButton />

            {/* Section centrale avec la chatbox */}
            <div className="flex-1 flex justify-center items-start p-4 w-full max-w-4xl mx-auto lg:px-8">
                <ChatBox />
            </div>

            {/* Section droite avec la liste des utilisateurs connectés */}
            <div className="w-full lg:w-1/5 p-4 flex flex-col items-center lg:static fixed bottom-16 right-0 bg-opacity-80 lg:bg-transparent rounded-lg shadow-lg lg:shadow-none">
                <ConnectedUsersList />
            </div>

            {/* Section en bas avec les conversations privées */}
            <div className="fixed bottom-0 w-full flex justify-center p-4 bg-opacity-90 backdrop-blur-md">
                <BottomChannelList />
            </div>
        </div>
    );
};

export default ProfileWithChat;
