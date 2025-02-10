// front/src/services/authService.js
const API_URL = 'http://localhost:5000/auth';

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion');
    }
    return data;
}

export async function signup(username, email, password) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: username, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription");
    }
    return data;
}
