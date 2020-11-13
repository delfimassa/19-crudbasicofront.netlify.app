import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

const EditarProducto = (props) => {
  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);
  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validar los datos
    const _categoria = categoria === "" ? props.producto.categoria : categoria;
    console.log(_categoria);
    console.log(nombreProductoRef.current.value);
    console.log(precioProductoRef.current.value);

    if (
      nombreProductoRef.current.value.trim() === "" ||
      precioProductoRef.current.value.trim() === "" ||
      _categoria === ""
    ) {
      setError(true);
      return;
    }
    // preparar el objeto a enviar
    setError(false);
    const productoEditado = {
      nombreProducto: nombreProductoRef.current.value,
      precioProducto: precioProductoRef.current.value,
      categoria: _categoria,
    };
    // enviar cambios a la api
    try {
      const respuesta = await fetch(
        `https://crudbasicodelfi.herokuapp.com/api/cafeteria/${props.producto._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoEditado),
        }
      );
      console.log(respuesta);
      if (respuesta.status === 200) {
        // actualizar lista de productos
        props.setRecargarProductos(true);
        Swal.fire(
          "Producto Editado",
          "El producto se edito correctamente",
          "success"
        );
        //rediccionar a la lista
        props.history.push("/productos");
      }
    } catch (datosError) {
      console.log(datosError);
      // cartel swal para el usuarip
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Editar Producto</h1>
      <Form onSubmit={handleSubmit}>
        {error ? (
          <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
        ) : null}
        <Form.Group>
          <Form.Label>Nombre de producto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe con leche"
            ref={nombreProductoRef}
            defaultValue={props.producto.nombreProducto}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: $50"
            ref={precioProductoRef}
            defaultValue={props.producto.precioProducto}
          />
        </Form.Group>
        <h2 className="text-center my-5">Categoria</h2>
        <Form.Group className="container d-flex justify-content-around">
          <Form.Check
            type="radio"
            label="Bebida caliente"
            name="categoria"
            value="bebida-caliente"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "bebida-caliente"}
          />
          <Form.Check
            type="radio"
            label="Bebida fria"
            name="categoria"
            value="bebida-fria"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "bebida-fria"}
          />
          <Form.Check
            type="radio"
            label="Sandwich"
            name="categoria"
            value="sandwich"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "sandwich"}
          />
          <Form.Check
            type="radio"
            label="Dulce"
            name="categoria"
            value="dulce"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "dulce"}
          />
          <Form.Check
            type="radio"
            label="Salado"
            name="categoria"
            value="salado"
            onChange={seleccionarCategoria}
            defaultChecked={props.producto.categoria === "salado"}
          />
        </Form.Group>
        <Button className="w-100 my-5" type="submit">
          Guardar producto
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(EditarProducto);
