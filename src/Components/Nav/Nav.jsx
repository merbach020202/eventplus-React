import React, { useContext } from "react";
import "./Nav.css";

import logoMobile from "../../Assets/images/logo-white.svg";
import logoDesktop from "../../Assets/images/logo-pink.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
    const { userData } = useContext(UserContext);

    return (
        <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
            <span
                className="navbar__close"
                onClick={() => {
                    setExibeNavbar(false);
                }}
            >
                x
            </span>

            <Link to="/" className="eventlogo">
                <img
                    className="eventlogo__logo-image"
                    src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                    alt="Event Plus logo"
                />
            </Link>

            <div className="navbar__items-box">
                <Link to="/" className="navbar__item">
                    Home
                </Link>

                {userData.nome && userData.role === "Administrador" ? (
                    <>
                        <Link className="navbar__item" to="/tipo-eventos">
                            Tipos de evento
                        </Link>
                        <Link className="navbar__item" to="/eventos">
                            Eventos
                        </Link>
                    </>
                ) : userData.nome && userData.role === "Usuario" ? (
                    <Link  to="/eventos-aluno" className="navbar__item">
                        Eventos Aluno
                    </Link>
                ) : null}
                {/* <Link className="navbar__item" to="/Teste">Testes</Link> */}
            </div>
        </nav>
    );
};

export default Nav;
