import React, { useState } from 'react'

export const Contador = () => {
    const [valorContador,setValorContador]=useState(0);
    const incrementar=()=>{
        setValorContador(valorContador + 1)
    }
  return (
    <div>
        <div data-testid='contador-valor'>{valorContador}</div>
        <button onClick={incrementar}>Incrementar</button>
    </div>
  )
}
