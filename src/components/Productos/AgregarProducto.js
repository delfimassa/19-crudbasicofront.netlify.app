import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter} from 'react-router-dom'; //sirve para redireccionar a una pagina

const AgregarProducto = (props) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);

  const seleccionarCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validar los datos
    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria === ""
    ) {
      //mostrar un cartel de error
      setError(true);
      return;
    }
    setError(false);
    //Enviar el producto nuevo a la API y
    //construir un objeto con los datos a enviar
    const datos = {
      nombreProducto, //nombreProducto: nombreProducto
      precioProducto,
      categoria,
    };
    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
      }; 
      const resultado = await fetch(
        "https://crudbasicodelfi.herokuapp.com/api/cafeteria",
        cabecera
      );
      console.log(resultado);
      //si la operacion fue exitosa
      if (resultado.status === 201) {
        Swal.fire(
          "Producto agregado",
          "El producto se agrego correctamente",
          "success"
        );
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error, intentelo nuevamente',
        });
      }
      // actualizar lista de productos
      props.setRecargarProductos(true);
      //rediccionar a alguna pagina
      props.history.push("/productos");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container my-4 d-flex justify-content-center">
      <Form className="w-75 mb-5" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Agregar Producto</h1>
        {error ? (
          <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
        ) : null}
        <Form.Group>
          <Form.Label>Nombre del producto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Café con leche"
            name="nombre"
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: $50"
            name="precio"
            onChange={(e) => setPrecioProducto(e.target.value)}
          />
        </Form.Group>
        <h3 className="text-center">Categoria</h3>
        <div className="text-center my-4">
          <Form.Check
            inline
            type="radio"
            name="categoria"
            label="Bebida caliente"
            value="bebida-caliente"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            name="categoria"
            label="Bebida fria"
            value="bebida-fria"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            name="categoria"
            label="Sandwich"
            value="sandwich"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            name="categoria"
            label="Dulce"
            value="dulce"
            onChange={seleccionarCategoria}
          />
          <Form.Check
            inline
            type="radio"
            name="categoria"
            label="Salado"
            value="salado"
            onChange={seleccionarCategoria}
          />
        </div>
        <Button variant="primary" type="submit" className="w-100">
          Guardar producto
        </Button>
      </Form>
    </section>
  );
};

export default withRouter(AgregarProducto);
