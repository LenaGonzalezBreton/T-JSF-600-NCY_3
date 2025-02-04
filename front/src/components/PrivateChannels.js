import React from 'react';

const privateChannels = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Emma' },
    { id: 3, name: 'Liam' },
    { id: 4, name: 'Sophia' },
    { id: 5, name: 'Oliver' },
    { id: 6, name: 'Ava' },
    { id: 7, name: 'Ethan' },
    { id: 8, name: 'Isabella' },
];

const BottomChannelList = () => {
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-[#D9D9D9] bg-opacity-30 backdrop-blur-lg border border-white/40 rounded-t-2xl p-4 w-auto max-w-[90%]">
            <h2 className="text-sm font-bold text-[#8C5B67] mb-2 text-center">Mes conversations privées</h2>
            <div className="flex items-center space-x-2 overflow-x-auto">
                {privateChannels.map((channel) => (
                    <div
                        key={channel.id}
                        className="flex-shrink-0 w-10 h-10 bg-[#8C5B67] rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:bg-pink-400"
                        title={channel.name}
                    >
                        {channel.name[0]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomChannelList;
