import React from "react";
import {
  screen,
  render,
  fireEvent,
  getByText,
  getByPlaceholderText,
  getByRole,
  waitFor,
} from "@testing-library/react";
import { Contador, TesteoDeFunciones } from "./COMPONENTS/Contador";
import { Saludo } from "./COMPONENTS/Saludo";
import { Api } from "./COMPONENTS/Api";
import App from "./App";

test('¿Existe el mensaje de bienvenida "Bienvenido a la practica de testing"?', async () => {
  render(<Saludo />);
  const palabra = await screen.findByText(
    "Bienvenido a la practica de testing"
  );
  expect(palabra).toBeInTheDocument();
});

test("El contador incrementa su valor de a uno", () => {
  render(<Contador />);
  // obtenermos elemento del dom
  const valorInicial = screen.getByTestId("contador-valor");
  //esperamos que esté en la pantalla de Contador.js
  expect(valorInicial).toHaveTextContent("0");
  //simulamos un click del contador
  fireEvent.click(screen.getByText("Incrementar"));
  //reseleccionamos el elemento dom que cambió
  const valorActualizado = screen.getByTestId("contador-valor");
  expect(valorActualizado).toHaveTextContent("1");
});

test("El valor ingresado en el campo, ¿se proyecta en el estado del DOM?", () => {
  render(<Saludo />);

  // Seleccionamos el input y el botón
  const input = screen.getByPlaceholderText("ingresa tu texto");
  const boton = screen.getByRole("button", { name: /Enviar texto/i });

  // Simulamos el cambio de valor en el input
  fireEvent.change(input, { target: { value: "perro" } });

  // Simulamos el envío del formulario
  fireEvent.click(boton);

  // Verificamos que el texto se haya actualizado correctamente
  const salida = screen.getByText(/Tu palabra es:/);
  expect(salida).toHaveTextContent("Tu palabra es:perro");
});

test("Se muestran los datos despues de la llamada asincrona", async () => {
  render(<Api />);
  //seleccionar elementos
  const input = screen.getByPlaceholderText("nombre del pokemon");
  const pokeBtn = screen.getByRole("button", { name: /Mostrar pokemon/ });
  const dato1 = screen.getByText("consultalo1");
  const dato2 = screen.getByText("consultalo2");

  //simulamos acciones
  fireEvent.change(input, { target: { value: "pikachu" } });
  fireEvent.click(pokeBtn);

  //esperamos recibir los datos del pokemon
  await waitFor(() => {
    expect(dato1).toHaveTextContent("pikachu");
    expect(dato2).toHaveTextContent("4");
  });
});

test("Enrutamiento con React router Dom", () => {
  render(<App />);
  //verificar que exista cierta pagina renderizada
  expect(screen.getByText("Inicio")).toBeInTheDocument();

  //presionamos el link para cambiar de página
  const btnServicios = screen.getByRole("link", { name: /servicios/ });
  fireEvent.click(btnServicios);

  //esperamos que en la pantalla aparezca el valor de la otra pagina
  expect(screen.getByText("Servicios")).toBeInTheDocument();
});

test("Se activa el boton tras rellenar el input,Se desactiva el boton tras vaciar el input", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("ingresa texto");
  fireEvent.change(input, { target: { value: "aa" } });
  expect(screen.getByTestId("pene")).toBeEnabled();
  fireEvent.change(input, { target: { value: "" } });
  expect(screen.getByTestId("pene")).toBeDisabled();
});
