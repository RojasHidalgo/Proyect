import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SearchDni = ({ placeholder = '', buscarDni, setInputValue, inputValue }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Validar que la longitud del valor sea igual o menor a 8 caracteres
    if (value.length <= 8) {
      setInputValue(value);
    } else {
      // Mostrar una alerta si se ingresan más de 8 caracteres
      alert('Solo ingrese los números de un DNI');
    }
  };

  return (
    <form action="">
      <input
        type="number"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange} // Usar la función de manejo de cambios personalizada
        maxLength="8" // Limitar la longitud máxima del input a 8 caracteres
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: 10 }}>
        <button style={{ borderRadius: 10, width: '50%', backgroundColor: 'gray', color: '#fff', fontSize: 18 }} className='btn' onClick={(event) => buscarDni(event)}>Consultar</button>
      </div>
    </form>
  );
};
