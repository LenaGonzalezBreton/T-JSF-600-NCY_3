import React from 'react';
import ReactDOM from 'react-dom/client'; // Utilise la nouvelle méthode
import App from './App';
import './index.css';


// Crée un "root" pour rendre ton application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
