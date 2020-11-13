import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Producto from "./Producto";

const ListaProductos = (props) => {
  return (
    <section className="container my-4">
      <h1 className="text-center ">Lista de productos</h1>
      <ListGroup>
        {props.productos.map((itemProducto) => (
          <Producto key={itemProducto._id} producto={itemProducto} setRecargarProductos={props.setRecargarProductos}></Producto>
        ))}
      </ListGroup>
      {/* producto es un props que esta guardando el objeto */}
    </section>
  );
};

export default ListaProductos;
