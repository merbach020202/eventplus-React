import React, { useContext } from "react";
import iconeLogout from "../../Assets/images/icone-logout.svg";
import "./PerfilUsuario.css";

import { UserContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const PerfilUsuario = () => {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        setUserData({});
        navigate("/");
    };

    return (
        <div className="perfil-usuario">
            {userData.nome ? (
                <>
                    <span className="perfil-usuario__menuitem">
                        {userData.nome}
                    </span>
                    <img
                        onClick={logOut}
                        title="Deslogar"
                        className="perfil-usuario__icon"
                        src={iconeLogout}
                        alt="imagem ilustrativa de uma porta de saída do usuário "
                    />
                </>
            ) : (
                <Link to="/Login" className="perfil-usuario__menuitem">Login</Link>
            )}
        </div>
    );
};

export default PerfilUsuario;
