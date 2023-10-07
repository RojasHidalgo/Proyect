import React, { useState } from 'react'
import { SearchDni } from './Components/SearchDNI'
import { DniCard } from './Components/DniCard'
import './Styles.css'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ConsultationApp = () => {

    const [getDates, setGetDates] = useState({ dni: '', nombre: '', apellidoP: '', apellidoM: '' })
    const [inputValue, setInputValue] = useState('')

    const buscarDni = async (event) => {
        event.preventDefault();
        console.log(inputValue)
        try {
            const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${inputValue}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1hdHN1ZGFjYW5vdG9qaG9lbDFAZ21haWwuY29tIn0.GqwE5ao3vLAl0KNfhcsVDtFaTsVo5l6Dav0wmfBAY5A`, {
              method: 'GET',
               
            });
          const data = await response.json();
            if (!response.ok) {
              const errorMessage = await response.text(); // Obtener el mensaje de error del servidor
              throw new Error(errorMessage);

            }
            if(data?.success===false){
              // Mostrar el toast de error con el mensaje "Error al obtener los datos"
              toast.error('Error al obtener los datos', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              },error);
            }else{
        
            
            console.log(data);
            setGetDates({
              dni: data.dni,
              nombre: data.nombres,
              apellidoM: data.apellidoMaterno,
              apellidoP: data.apellidoPaterno,
            });
        
            // Mostrar el toast de éxito después de asegurarte de que la solicitud fue exitosa
            toast.success('La consulta se ha realizado con éxito', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
          } catch (error) {
            console.error('Error al obtener los datos:', error);
        
            // Mostrar el toast de error con el mensaje "Error al obtener los datos"
              toast.error('Error al obtener los datos', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            },error);
          }
    };

    return (
        <>
        <div className='header-dni' style={{
          backgroundColor:'gray',
          display:'flex',
          height:'15vmin',
          textAlign:'center', 
          justifyContent:'center',
          alignItems:'center',
          borderRadius:'10px 10px 10px 10px',
          marginBottom:'15px',
          
          
          }}>
          <h1 style={{
            color:'white', 
            fontSize:'8vmin',
            fontFamily:'Monserrat',
            
            }}>Consultar DNI</h1>
        </div>
            <SearchDni placeholder='Ingrese su número de Ninja Ambu' buscarDni={buscarDni} setInputValue={setInputValue} inputValue={inputValue} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DniCard getDates={getDates}/>
            </div>
            <ToastContainer />
        </>
    )
}
