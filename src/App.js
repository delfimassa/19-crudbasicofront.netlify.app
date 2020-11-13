import React, { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Principal/Inicio";
import EditarProducto from "./components/Productos/EditarProducto";
import AgregarProducto from "./components/Productos/AgregarProducto";
import ListaProductos from "./components/Productos/ListaProductos";
import PaginaError from "./components/error404/PaginaError";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Swal from "sweetalert2";
import Paginacion from "./components/Productos/Paginacion";

function App() {
  const [productos, setProductos] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);
  // states para paginacion(3)
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaActual, setPaginaActual] = useState(0);
  const [cantidad, setCantidad] = useState(3);

  useEffect(() => {
    if (recargarProductos) {
      consultarAPI();
      setRecargarProductos(false);
    }
  }, [recargarProductos]);

  const consultarAPI = async (paginaAct = paginaActual) => {
    // creo el parametro y le doy el valor del paginaActual por defecto
    try {
      //obtener lista de productos
      const consulta = await fetch(
        `https://crudbasicodelfi.herokuapp.com/api/cafeteria?cantidad=${cantidad}&paginaactual=${paginaAct}`
      );
      console.log(consulta);
      const respuesta = await consulta.json();
      console.log(respuesta);
      if ((await consulta.status) !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, intentelo nuevamente",
        });
      }
      //guardar en el state
      setProductos(respuesta.mensaje);
      setTotalPaginas(respuesta.totalPaginas);
      setPaginaActual(parseInt(respuesta.paginaActual));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route
          exact
          path="/productos"
          render={() => (
            <div>
              <ListaProductos
                productos={productos}
                setRecargarProductos={setRecargarProductos}
              ></ListaProductos>
              <Paginacion
                totalPaginas={totalPaginas}
                paginaActual={paginaActual}
                consultarAPI={consultarAPI}
              ></Paginacion>
            </div>
          )}
        ></Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto
            setRecargarProductos={setRecargarProductos}
          ></AgregarProducto>
        </Route>
        <Route
          exact
          path="/productos/editar/:id"
          render={(props) => {
            //codigo a ejecutar antes de renderizar el componente
            //obtener el id de la ruta
            const idProducto = props.match.params.id;
            console.log(idProducto);
            //buscar el producto que coincida con el id
            const productoSeleccionado = productos.find(
              (producto) => producto._id === idProducto
            );
            //mostrar el componente editarProducto
            return (
              <EditarProducto
                producto={productoSeleccionado}
                setRecargarProductos={setRecargarProductos}
              ></EditarProducto>
            );
          }}
        ></Route>
        <Route exact path="*">
          <PaginaError></PaginaError>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
