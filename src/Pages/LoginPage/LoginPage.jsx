import React, { useContext, useState, useEffect } from "react";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import logo from "../../Assets/images/logo-pink.svg";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import loginImage from "../../Assets/images/login.svg"
import api, {loginResource} from "../../Services/Service"
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";


const LoginPage = () => {    
    const [user, setUser] = useState({email: "edu@admin.com", senha: "123456"})
    const {userData, setUserData} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
      if (userData.nome) navigate("/")       
  }, [userData]) //O userData impede que alguém (quando logado), não acesse a página do Login pela URL


    async function handleSubmit(e) {
        e.preventDefault()

        //Validar o usuário e a senha
        //tamanho mínimo de  caracteres : 3
        if (user.email.length >= 3 && user.senha.length >= 3) {
            //Chama api
            try {
                const promise = await api.post(loginResource, {
                    email: user.email,
                    senha: user.senha,
                });

                const userFullToken = userDecodeToken(promise.data.token);
                setUserData(userFullToken); //guarda o token globalmente

                localStorage.setItem("token", JSON.stringify(userFullToken));
                navigate("/")//Envia o usuário para a home

            } catch (error) {
                alert("Verifique os dados de conexão com a internet");
                console.log(error);
            }
        } else {
            alert("Preencha os dados corretamente");
        }
    }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageRender={loginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              addtionalClass="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({...user, email: e.target.value.trim()})}}
              placeholder="Username"
            />
            <Input
              addtionalClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({...user, senha: e.target.value.trim()})
            }}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              className="frm-login__button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
