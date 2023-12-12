import React, { useState } from "react";
import Button from "../../Components/Botão/Button";
import Input from "../../Components/Input/Input";
import Title from "../../Components/Titulo/Title";

//Variáveis do componente
const TestePage = () => {
    const { n1, setN1 } = useState(0); //number
    const { n2, setN2 } = useState(0); //number
    const { total, setTotal } = useState();

    function handleCalcular(e) {
        e.preventDefault();
        setTotal(parseFloat(n1) + parseFloat(n2));
    }

    

    return (
        <div>
            <Title 
                titleText="Testes Page"
                potatoClass='margem-acima'
                />

            {/* <h1>Pagina de Poc`s</h1>
            <h2>Calculator</h2>

            <form onSubmit={handleCalcular}>
                <Input
                    type="number"
                    placeholder="Primeiro número"
                    name="n1"
                    id="n1"
                    value={n1}
                    onChange={(e) => {
                        setN1(e.target.value);
                    }}
                />
            </form>

            <form action="">
                <Input
                    type="number"
                    placeholder="Segundo número"
                    name="n2"
                    id="n2"
                    value={n2}
                    onChange={(e) => {
                        setN2(e.target.value);
                    }}
                />

                <Button
                    textButton="Calcular"
                    type="submit"
                    onClick={handleCalcular}
                />
                <span>
                    Resultado: <strong id="res">{total}</strong>
                </span>
            </form> */}
        </div>
    );
};

export default TestePage;
