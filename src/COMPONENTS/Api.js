import React, { useState, useRef, useEffect } from "react";
import "./Api.css";

export const Api = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokeObject,setPokeObject]=useState(null)
  const pokeInput = useRef();
  const recogerDatos = (e) => {
    e.preventDefault();
    let pokeName = pokeInput.current.value;
    setPokemon(pokeName);
    console.log(pokeName);
  };

  useEffect(() => {
    if (pokemon) {
      const solicitarDatos = async () => {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        let respuesta = await fetch(url);
        let data = await respuesta.json();
        console.log(data);

        const pokeObjeto = {
          nombre: data.name,
          altura: data.height,
        };
        setPokeObject(pokeObjeto)
        
      };
      solicitarDatos();
    }
  }, [pokemon]);
  return (
    <div className="container-poke">
      <div className="aa">
        <span>Ingresa el nombre del pokemon:</span>
        <input
          placeholder="nombre del pokemon"
          name="pokemon"
          ref={pokeInput}
        />
        <button onClick={recogerDatos}>Mostrar pokemon</button>
      </div>
      <div className="aa">
        <span>{pokeObject === null ? 'consultalo1' : pokeObject.nombre}</span>
        <span>{pokeObject === null ? 'consultalo2' : pokeObject.altura}</span>
      </div>
    </div>
  );
};
