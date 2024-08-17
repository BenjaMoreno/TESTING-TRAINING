import React, { useState } from "react";

export const Saludo = () => {
    const [texto,setTexto]=useState('Aqui esta el texto')
    const cambiarTexto=(e)=>{
        e.preventDefault();
        
        let texto=e.target.elements.texto.value;
        setTexto(texto)
    }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
      <div>Bienvenido a la practica de testing</div>
      <strong style={{color:'purple'}}>Tu palabra es:{texto}</strong>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={cambiarTexto}>
        <h1>Formulario para testing</h1>
        <label>Ingresa un texto cualquiera:</label>
        <input type="text" placeholder="ingresa tu texto"  name="texto"/>
        <button type="submit">Enviar texto</button>
      </form>
    </div>
  );
};
