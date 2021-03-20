import React from "react";
import "./ExpensesCard.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteExpense } from "../../service/expenses.service";

const ExpensesCard = ({ expense, space, deleteExp }) => {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;

  const meses = {
    1: "ene",
    2: "feb",
    3: "mar",
    4: "abr",
    5: "may",
    6: "jun",
    7: "jul",
    8: "ago",
    9: "sep",
    10: "oct",
    11: "nov",
    12: "dic",
  };

  const [modal, setModal] = React.useState(false);
  const [image, setImage] = React.useState("");
  const toggle = () => setModal(!modal);

  const handleRemove = () => {
    deleteExp(space._id, expense._id);
    setModal(!modal);
  };

  const split = expense.name.toLowerCase().split(" ");

  const comida = [
    "cena",
    "compra",
    "pizzas",
    "burguers",
    "hamburguesas",
    "pan",
    "fruta",
    "verduras",
    "carne",
    "bbq",
    "barbacoa",
    "sal",
    "vinagre",
    "aceite",
    "aceitunas",
    "olivas",
    "patatas",
    "pizza",
    "verdura",
    "zanahorias",
    "manzanas",
    "peras",
    "melon",
    "sandia",
    "naranjas",
  ];

  const bebida = [
    "cafe",
    "alcohol",
    "ron",
    "ginebra",
    "whisky",
    "vodka",
    "fanta",
    "cocacola",
    "sprite",
    "tónica",
    "tonica",
    "pepsi",
    "leche",
    "vino",
    "vermut",
    "cerveza",
  ];

  const limpieza = [
    "limpieza",
    "hogar",
    "estropajos",
    "estropajo",
    "desengrasante",
    "lejia",
    "limpiacristales",
    "suavizante",
    "detergente",
    "basura",
    "bolsas",
    "servilletas",
    "papel",
    "aluminio",
    "film",
  ];

  const servicios = [
    "luz",
    "agua",
    "factura",
    "cerrajero",
    "electricista",
    "fontanero",
    "veterinario",
    "comunidad",
    "alquiler",
    "gas",
  ];

  const fiesta = ["fiesta", "discoteca", "concierto"];

  const regalo = ["regalo", "regalos", "sorpresa", "cumpleaños"];

  const combustible = ["gasolina", "diesel", "caldera", "carbon", "butano"];

  const imagenSrc = () =>{
    split.forEach((word)=>{
      comida.forEach((food) => {
        if (word.includes(food)){
          if(!image.length){
            setImage("comida")
          }
        }
      })
      bebida.forEach((food) => {
        if (word.includes(food)){
          if(!image.length){
            setImage("bebida")
          }
        }
      })
      limpieza.forEach((item) => {
        if (word.includes(item)){
          if(!image.length){
            setImage("limpieza")
          }
        }
      })
      servicios.forEach((item) => {
        if (word.includes(item)){
          if(!image.length){
            setImage("servicios")
          }
        }
      })
      fiesta.forEach((item) => {
        if (word.includes(item)){
          if(!image.length){
            setImage("fiesta")
          }
        }
      })
      regalo.forEach((item) => {
        if (word.includes(item)){
          if(!image.length){
            setImage("regalo")
          }
        }
      })
      combustible.forEach((item) => {
        if (word.includes(item)){
          if(!image.length){
            setImage("combustible")
          }
        }
      })
  })
  }

  React.useEffect(()=>{
    imagenSrc()
  },[])

  return (
    <>
      <div onClick={toggle} className="card-expenses">
        <div className="columna">
          <span>{meses[mes]}</span>
          <span>{dia}</span>
        </div>
        <div>
          <span>{image}</span>
        </div>
        <div className="row-expense">
          <p>{expense.name}</p>
        </div>
        <div className="row-expense">
          <p>{expense.price}€</p>
        </div>
      </div>
      <Modal isOpen={modal} centered="true" toggle={toggle}>
        <ModalHeader toggle={toggle}>Gasto de '{space.name}'</ModalHeader>
        <ModalBody>
          <p>
            <span style={{ fontWeight: "700", marginRight: "2%" }}>
              Nombre del gasto:
            </span>
            {expense.name}
          </p>
          <p>
            <span style={{ fontWeight: "700", marginRight: "2%" }}>
              Descripcion:
            </span>
            {expense.description}
          </p>
          <p>
            <span style={{ fontWeight: "700", marginRight: "2%" }}>
              Tipo de gasto:
            </span>
            {expense.type}
          </p>
          <p>
            <span style={{ fontWeight: "700", marginRight: "2%" }}>
              Precio:
            </span>
            {expense.price}€
          </p>
          <p>
            <span style={{ fontWeight: "700", marginRight: "2%" }}>
              Pagado por:
            </span>
            {expense.createdBy}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemove}>
            Borrar gasto
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ExpensesCard;
