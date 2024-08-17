import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Saludo } from "./COMPONENTS/Saludo";
import { Contador } from "./COMPONENTS/Contador";
import { Api } from "./COMPONENTS/Api";
import { Inicio } from "./COMPONENTS/Paginas/Inicio";
import { Servicios } from "./COMPONENTS/Paginas/Servicios";

const App = () => {
  // estados
  const [disabled,setDisabled]=useState(true);
  const [valorInput,setValorInput]=useState(null);
  useEffect(()=>{
    if(valorInput){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  },[valorInput])
  return (
    <BrowserRouter>
      <div className="grid-container">
        <div className="grid-item">
          <Link to={'/'}>inicio</Link>
          <Link to={'/servicios'}>servicios</Link>
        </div>
        <div className="grid-item">
          <Routes>
            <Route path="/" element={<Inicio/>}></Route>
            <Route path="/servicios" element={<Servicios/>}></Route>
          </Routes>
        </div>
        <div className="grid-item">
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "50% 50%",
            }}
            className="grilla"
          >
            <Contador />
            <Saludo />
            <Api />
            <div className="btn-change">
              <input type="text" onChange={(e)=>{setValorInput(e.target.value)}}  placeholder="ingresa texto"/>
              <button disabled={disabled} data-testid='pene'>Enviar</button>
              <span>{valorInput}</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
