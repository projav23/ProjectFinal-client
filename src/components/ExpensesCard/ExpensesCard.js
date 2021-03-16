import React from "react";
import "./ExpensesCard.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteExpense } from "../../service/expenses.service";

const ExpensesCard = ({ expense, space, deleteExp}) => {
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
  const toggle = () => setModal(!modal);

  const handleRemove = () =>{
    deleteExp(space._id, expense._id)
    setModal(!modal)
  }

  return (
    <>
      <div onClick={toggle} className="card-expenses">
        <div className="columna">
          <span>{meses[mes]}</span>
          <span>{dia}</span>
        </div>
        <div>
          <span>Image</span>
        </div>
        <div className="row-expense">
          <p>{expense.name}</p>
        </div>
        <div className="row-expense">
          <p>{expense.price}€</p>
        </div>
      </div>
      <Modal isOpen={modal} centered='true' toggle={toggle} >
        <ModalHeader toggle={toggle}>Gasto de '{space.name}'</ModalHeader>
        <ModalBody>
          <p><span style={{fontWeight:'700', marginRight:'2%'}}>Nombre del gasto:</span>{expense.name}</p>
          <p><span style={{fontWeight:'700', marginRight:'2%'}}>Descripcion:</span>{expense.description}</p>
          <p><span style={{fontWeight:'700', marginRight:'2%'}}>Tipo de gasto:</span>{expense.type}</p>
          <p><span style={{fontWeight:'700', marginRight:'2%'}}>Precio:</span>{expense.price}€</p>
          <p><span style={{fontWeight:'700', marginRight:'2%'}}>Pagado por:</span>{expense.createdBy}</p>
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
