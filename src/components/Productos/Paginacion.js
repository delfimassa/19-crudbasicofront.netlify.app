 import React from 'react';
 import Pagination from "react-bootstrap/Pagination"
 
 const Paginacion = (props) => {
    let active = props.paginaActual;
    let items = [];
    for (let number = 0; number < props.totalPaginas; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={()=>{props.consultarAPI(number)}}>
          {number+1}
        </Pagination.Item>,
      );
    }
     return (
         <div className="d-flex justify-content-center">
           <Pagination>{items}</Pagination>
           <br />

        
        </div>
  
     );
 };
 
 export default Paginacion;