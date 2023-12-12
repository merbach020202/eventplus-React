import React, { useEffect, useState } from "react";
import "./TipoEventosPage.css";

import Title from "../../Components/Titulo/Title";
import MainContent from "../../Components/MainContent/MainContent";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import Container from "../../Components/Container/Container";
import tipoEventoImage from "../../Assets/images/tipo-evento.svg";
import api, { eventsTypeResource } from "../../Services/Service";
import TableTp from "./TableTP/TableTp";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner"

const TipoEventosPage = () => {
    //States
    const [frmEdit, setFrmEdit] = useState(false); //Está em modo de edição?
    const [titulo, setTitulo] = useState("");
    const [idEvento, setIdEvento] = useState(null) //para editar, por causa do evento!
    const [tipoEventos, setTipoEventos] = useState([]); //array
    const [notifyUser, setNotifyUser] = useState(); //Componente Notification
    const [showSpinner, setShowSpinner] = useState(false); //Spinner Loading

    //O useEffect só é usado quando a página já está
    useEffect(() => {
        async function loadEventsType() {
            setShowSpinner(true)
            try {
                const retorno = await api.get(eventsTypeResource);
                setTipoEventos(retorno.data);
                console.log(retorno.data);
            } catch (error) {
                console.log("Erro na Api");
                console.log(error);
            }

            setShowSpinner(false)
        }
        loadEventsType();
    }, []);

    //////////////////////// CADASTRA DADOS ////////////////////////
    async function handleSubmit(e) {
        e.preventDefault();
        
        setShowSpinner(true)
        if (titulo.trim().length < 3) {
            setNotifyUser({
                titleNote: "Aviso",
                textNote: "O título deve ter pelo menos 3 caracteres",
                imgIcon: "warning",
                imgAlt: "Imagem de ilustração de aviso. Moça em frente a um símbolo de exclamação.",
                showMessage: true,
            });
        }
        
        try {
            const retorno = await api.post(eventsTypeResource, {
                titulo: titulo,
            });

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: "cadastro apagado com sucesso",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true,
            });

            setTitulo("");

            const buscaEventos = await api.get(eventsTypeResource);
            setTipoEventos(buscaEventos.data);

            // console.log(retorno);
        } catch (error) {
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Algo não funcionou",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de erro.",
                showMessage: true,
            });
        }
        
        setShowSpinner(false)

    }

    //////////////////////// EDITAR CADASTRO ////////////////////////
    async function showUpdateForm(idElement) {
        setFrmEdit(true);
        setIdEvento(idElement)

        setShowSpinner(true)
        try {
            const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
            setTitulo(retorno.data.titulo);
            console.log(retorno.data);
        } catch (error) {
            alert("ShowUpdateForm")
        }
        setShowSpinner(false)
    }

    ////////////cancela a tela/ação de edição (volta parao form de cadastro)
    function editActionAbort() {
        setFrmEdit(false);
        setTitulo("");
        setIdEvento(null)
    }

    //////////////////////// Atualizar ////////////////////////
    async function handleUpdate(e) {
        e.preventDefault();
        
        setShowSpinner(true)
        try {
            const retorno = await api.put(eventsTypeResource + "/" + idEvento, 
            {titulo : titulo})
            //notificar o usuário
            if (retorno.status == 204) {
                setTitulo("")
                setIdEvento("")

                setNotifyUser({
                titleNote: "Sucesso",
                textNote: "Deu Certo!!!",
                imgIcon: "success",
                imgAlt: "Imagem de ilustração de aviso. Moça segurando um balão.",
                showMessage: true,
            });

            //atualizar os dados na tela
            const retorno = await api.get(eventsTypeResource);
            setTipoEventos(retorno.data);
            }
            
        } catch (error) {
            //notificar o erro ao usuário
            setNotifyUser({
                titleNote: "Erro",
                textNote: "Por favor tente novamente mais tarde",
                imgIcon: "danger",
                imgAlt: "Imagem de ilustração de erro.",
                showMessage: true,
            });
        }
        setShowSpinner(false)
    }

    //////////////////////// APAGAR DADOS ////////////////////////
    //apaga o tipo de evento da api
    async function handleDelete(idElement) {
        //confirm é um alert que retorna true ou false
        if (window.confirm("Confirma a exclusão?")) {

            setShowSpinner(true)
            try {
                const promise = await api.delete(
                    `${eventsTypeResource}/${idElement}`
                );

                if (promise.status == 204) {
                    setNotifyUser({
                        titleNote: "Deletado",
                        textNote: "cadastro apagado com sucesso",
                        imgIcon: "success",
                        imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                        showMessage: true,
                    });
                    //Atualiza a variável e roda o useState novamente (que dá um get na api)

                    const buscaEventos = await api.get(eventsTypeResource);

                    setTipoEventos(buscaEventos.data);
                }
            } catch (error) {
                alert(`Não deu certo`);
            }
            setShowSpinner(false)
        }
    }

    return (
        <>
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
            {showSpinner ? <Spinner /> : null}
            
            <MainContent>
                <section className="cadastro-evento-section">
                    <Container>
                        <div className="cadastro-evento__box">
                            <Title titleText={"Cadastro Tipo de Eventos"} />

                            <ImageIllustrator imageRender={tipoEventoImage} />

                            <form
                                className="ftipo-evento"
                                onSubmit={frmEdit ? handleUpdate : handleSubmit}
                            >
                                {/* {Cadastrar iu editar?} */}
                                {!frmEdit ? (
                                    //Cadastrar
                                    <>
                                        <Input
                                            id="Titulo"
                                            placeholder="Titulo"
                                            name={"Titulo"}
                                            type={"text"}
                                            required={"required"}
                                            value={titulo}
                                            manipulationFunction={(e) => {
                                                setTitulo(e.target.value);
                                            }}
                                        />

                                        <Button
                                            textButton="Cadastrar"
                                            id="cadastrar"
                                            name="cadastrar"
                                            type="submit"
                                        />
                                    </>
                                ) : (
                                    /////////////Editar
                                    <>
                                        <Input
                                            id="Titulo"
                                            placeholder="Titulo"
                                            name={"Titulo"}
                                            type={"text"}
                                            required={"required"}
                                            value={titulo}
                                            manipulationFunction={(e) => {
                                                setTitulo(e.target.value);
                                            }}
                                        />
                                        <div className="buttons-editbox">
                                            <Button
                                                textButton="Atualizar"
                                                id="cadstrar"
                                                name="cadastrar"
                                                type="submit"
                                                additionalClass="button-component--middle"
                                            />

                                            <Button
                                                textButton="Cancelar"
                                                id="cadstrar"
                                                name="cadastrar"
                                                type="button"
                                                manipulationFunction={
                                                    editActionAbort
                                                }
                                                additionalClass="button-component--middle"
                                            />
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </Container>
                </section>

                <section className="lista-eventos-section">
                    <Container>
                        <Title
                            titleText={"Lista Tipos de Eventos"}
                            color="white"
                        />

                        <TableTp
                            dados={tipoEventos}
                            fnUpdate={showUpdateForm}
                            fnDelete={handleDelete}
                        />
                    </Container>
                </section>
            </MainContent>
        </>
    );
};

export default TipoEventosPage;
