import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const Producto = (props) => {
  const eliminarProducto = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "No puedes recuperar un producto eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        //aqui tengo que eliminar el producto
        try {
          const resultado = await fetch(
            `https://crudbasicodelfi.herokuapp.com/api/cafeteria/${_id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(resultado);

          if (resultado.status === 200) {
            props.setRecargarProductos(true);
            Swal.fire(
              "Producto eliminado",
              "Su producto fue eliminado correctamente",
              "success"
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrio un error, intentelo nuevamente",
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error, intentelo nuevamente",
          });
        }
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.producto.nombreProducto}{" "}
        <span className="font-weight-bold">
          ${props.producto.precioProducto}
        </span>
      </p>
      <div>
        <Link
          className="btn btn-success mr-2"
          to={`/productos/editar/${props.producto._id}`}
        >
         <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </Link>
        <Button
          variant="danger"
          type="button"
          onClick={() => eliminarProducto(props.producto._id)}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default Producto;
