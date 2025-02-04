// src/services/persistenceService.js
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../../data.json');

exports.getChannels = () => {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    return {};
};

exports.saveChannels = (channels) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(channels, null, 2));
};
