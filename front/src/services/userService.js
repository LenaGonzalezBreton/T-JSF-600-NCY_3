export async function updateProfile(userId, profileData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // Si votre back utilise une authentification par token, vous pouvez ajouter l'en-tête Authorization
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la mise à jour du profil');
    }
    return data;
}