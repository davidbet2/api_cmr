import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formulario } from '../components/Formulario';

export const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);

  const { id } = useParams();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p>Utiliza este formulario para editar un cliente</p>
      {cliente.nombre ? <Formulario cliente={cliente} cargando={cargando} /> : <p>Cliente ID no valido</p>}
    </>
  );
};
