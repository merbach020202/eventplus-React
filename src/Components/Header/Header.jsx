import React, { useState } from "react";
import "./Header.css";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import menubar from '../../Assets/images/menubar.png'



const Header = () => {

    const [exibeNavbar, setExibeNavbar] = useState(false)

    return (
        <header className="headerpage">
            <Container>
                <div className="header-flex">
                    <img
                        src={menubar}
                        alt="Imagem menu de barras. Serve para esconder ou mostrar o menu no smartphone"
                        onClick={() => (setExibeNavbar(true))}
                        className="headerpage_menubar"
                    />

                    <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar}/>
                    <PerfilUsuario />
                </div>
            </Container>
        </header>
    );
};

export default Header;
