import React from 'react';

const connectedUsers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Emma' },
    { id: 3, name: 'Liam' },
    { id: 4, name: 'Sophia' },
    { id: 5, name: 'Oliver' },
    { id: 6, name: 'Ava' },
    { id: 7, name: 'Ethan' },
    { id: 8, name: 'Isabella' },
    { id: 9, name: 'Noah' },
    { id: 10, name: 'Mia' },
];

const ConnectedUsersList = () => {
    return (
        <div className="fixed top-0 right-0 h-full bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/40 rounded-l-2xl p-4 flex flex-col items-center">
            <h2 className="text-sm font-bold text-[#8C5B67] mb-4">Utilisateurs connectés</h2>
            <div className="flex-1 overflow-y-auto space-y-2">
                {connectedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="w-10 h-10 bg-[#8C5B67] rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:bg-pink-400"
                        title={user.name}
                    >
                        {user.name[0]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConnectedUsersList;
