import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../Components/Header/Header";
import EventosPage from "../Pages/EventosPage/EventosPage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import TestePage from "../Pages/TestePage/TestePage";
import TipoEventosPage from "../Pages/TipoEventosPage/TipoEventosPage";
import Footer from "../Components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../Pages/EventosAlunoPage/EventosAlunoPage";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<HomePage />} path={"/"} exact />

                <Route
                    path="/tipoEventos"
                    element={
                        <PrivateRoute redirectTo="/">
                            <TipoEventosPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/eventos"
                    element={
                        <PrivateRoute redirectTo="/">
                            <EventosPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/eventos-aluno"
                    element={
                        <PrivateRoute redirectTo="/">
                            <EventosAlunoPage />
                        </PrivateRoute>
                    }
                />

                <Route element={<LoginPage />} path={"/login"} />
                <Route element={<TestePage />} path={"/teste"} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Rotas;
