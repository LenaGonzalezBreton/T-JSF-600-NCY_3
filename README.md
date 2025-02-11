# 💜 **Only Femme**  
**Le réseau social par et pour les femmes.**  

---

## 🚀 **Présentation**  
**Only Femme** est une **plateforme communautaire dédiée aux femmes**, créée pour offrir un espace sûr, bienveillant et inspirant. Conçu **par des femmes pour les femmes**, ce réseau social met en avant l'entraide, le partage d'expériences et la valorisation des parcours féminins.  

---

## 🌟 **Pourquoi Only Femme ?**  
✨ **Un espace bienveillant** : Ici, la parole des femmes est libre et respectée.  
🤝 **Une communauté engagée** : Échangez avec des femmes de tous horizons et partagez vos expériences.  
📢 **Un réseau d’entraide** : Trouvez du soutien, des conseils et des opportunités.  
🚧 **Une sécurité renforcée** : Des outils de modération avancés pour une expérience sereine.  

---

## 🛠️ **Technologies utilisées**  
🖥️ **Frontend** : React.js, TailwindCSS  
🛠️ **Backend** : Node.js, Express.js, WebSocket (Socket.io)  
📦 **Base de données** : MongoDB avec Prisma  
🔐 **Authentification** : JWT (JSON Web Token)  
📡 **Communication temps réel** : Socket.io  

---

## 📦 **Installation et démarrage**  

### **1️⃣ Cloner le projet**  
```sh
git clone https://github.com/username/only-femme.git
cd only-femme
```

### **2️⃣ Installer les dépendances**  
📌 **Backend**  
```sh
cd backend
npm install
```

📌 **Frontend**  
```sh
cd frontend
npm install
```

### **3️⃣ Configurer les variables d’environnement**  
Dans `backend/.env` et `frontend/.env`, ajoutez :  
```env
# Backend
PORT=5000
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/onlyfemme
JWT_SECRET=supersecretkey
```

---

## 🚀 **Démarrer le projet**  

### **Démarrer le backend**  
```sh
cd backend
npm start
```
🟢 **Le serveur s’exécutera sur** `http://localhost:5000`

### **Démarrer le frontend**  
```sh
cd frontend
npm start
```
🟣 **L’interface sera accessible sur** `http://localhost:3000`

---

## 🎯 **Commandes utiles**  

### 📦 **Gestion des dépendances**  
```sh
npm install        # Installer toutes les dépendances
npm update         # Mettre à jour les dépendances
npm uninstall <package>  # Supprimer une dépendance
```

### 🛠️ **Développement**  
```sh
npm run dev        # Démarrer le serveur en mode développement (backend)
npm start          # Lancer le projet (frontend & backend)
npm run build      # Compiler le projet
```

### 🚀 **Base de données (Prisma + MongoDB)**  
```sh
npx prisma migrate dev   # Appliquer les migrations en développement
npx prisma generate      # Générer les modèles Prisma
npx prisma studio        # Ouvrir Prisma Studio (interface web pour la DB)
```

---

## 🛠️ **Fonctionnalités principales**  
- 🗣️ **Discussions & forums** : Échangez sur des sujets variés.  
- 🎨 **Création de contenu** : Partagez vos expériences, articles et inspirations.  
- 🤝 **Networking** : Connectez-vous avec d'autres femmes selon vos centres d'intérêt.  
- 🎓 **Éducation & empowerment** : Ressources, formations et ateliers dédiés aux femmes.  

---

## 👥 **Contribuer**  
📌 **1️⃣ Fork du projet**  
📌 **2️⃣ Création d’une branche**  
```sh
git checkout -b feature-nouvelle-fonctionnalité
```
📌 **3️⃣ Commit des modifications**  
```sh
git add .
git commit -m "Ajout de la nouvelle fonctionnalité"
git push origin feature-nouvelle-fonctionnalité
```
📌 **4️⃣ Soumettre une pull request**  

---

## 📜 **Licence**  
🚀 **Only Femme** est un projet open-source sous licence **MIT**.

> **💜 Rejoignez-nous et faites partie du changement !**
