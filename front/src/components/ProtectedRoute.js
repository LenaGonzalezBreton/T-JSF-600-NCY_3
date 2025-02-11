import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, token, loading } = useContext(AuthContext);

    console.log("🔎 Vérification accès à la route protégée...");
    console.log("🔍 loading:", loading, " | user:", user, " | token:", token);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        console.log("🚫 Accès refusé, redirection vers /");
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
