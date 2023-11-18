
import React from 'react';
import './Error404.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="error-container">
      <img src="https://placekitten.com/300/300" alt="Error 404" />
      <h1>Error 404</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/formulario">Volver a la página de inicio</Link>
    </div>
  );
};

export default Error404;
