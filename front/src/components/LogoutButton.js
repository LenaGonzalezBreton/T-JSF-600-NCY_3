import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    return (
        <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
            Déconnexion
        </button>
    );
};

export default LogoutButton;
