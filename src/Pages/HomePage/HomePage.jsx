import React, { useEffect, useState } from "react"; //Import do React porque trabalha com jsx
import "./HomePage.css";

import Banner from "../../Components/Banner/Banner";
import MainContent from "../../Components/MainContent/MainContent";
import VisionSection from "../../Components/VisionSection/VisionSection";
import ContactSection from "../../Components/ContactSection/ContactSection";
import Title from "../../Components/Titulo/Title";
import NextEvent from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";
import api from "../../Services/Service";
import Notification from "../../Components/Notification/Notification";

import { nextEventResource } from "../../Services/Service";


const HomePage = () => {

    const [nextEvents, setNextEvents] = useState([]) 
    const [notifyUser, setNotifyUser,] = useState()
    
    //Roda somente na inicialização do componente
    useEffect(() => {
        async function getNextEvents() {
            try {
                const promisse = await api.get(`${nextEventResource}`)
                const dados = await promisse.data
                console.log(dados);
                setNextEvents(dados)//atualiza o status
                
            } catch (error) {
                alert(`Deu ruim na API`)
            }
        }

        getNextEvents()//Roda a função

    }, [])
    return (
            <MainContent>
                {<Notification {...notifyUser} setNotifyUser={setNotifyUser}/>}

                <Banner />
                <section className="proximos-eventos">
                    <Container>

                        <Title titleText={"Proximos Eventos"} />

                        <div className="events-box">

                            {
                                nextEvents.map((e) => {
                                    return (
                                    <NextEvent
                                    key={e.idEvento}
                                    eventDate={e.dataEvento}
                                    title={e.nomeEvento}
                                    description={e.descricao}
                                    idEvent={e.idEvento}
                                />
                                )
                                })
                            }

                           
                        </div>
                    </Container>
                </section>

                <VisionSection />

                <ContactSection />

            </MainContent>
    );
};

export default HomePage;
