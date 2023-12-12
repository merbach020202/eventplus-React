import React, { useState } from "react";

const Input = ({ onchange, type, placeholder, name, id, value }) => {
    // const {numero1, SetNumero1} = useState();//Dado do componente
    
    return (
        <>
            <input 
            type={type} 
            placeholder={placeholder} 
            name={name} 
            id={id} 
            value={value}
            onChange={onchange}
            />
            <span>{value}</span>
        </>
    );
};

export default Input;
