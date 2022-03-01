import { Formulario } from '../components/Formulario';

export const NuevoCliente = () => {
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
      <p>Llena los siguientes campos para registar un cliente</p>
      <Formulario/>
    </>
  );
};
