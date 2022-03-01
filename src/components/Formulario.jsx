import { Form, Formik, Field } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Alerta } from './Alerta';
import { Spinner } from './Spinner';

export const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const NuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El Nombre es muy corto')
      .max(20, 'El Nombre es muy largo')
      .required('El Nombre del cliente es obligatorio'),
    empresa: Yup.string().required('El Nombre de la empresa es obligatorio'),
    email: Yup.string()
      .email('Ingrese un email valido')
      .required('El email es obligatorio'),
    telefono: Yup.number()
      .integer('Número no valido')
      .positive('Número no valido')
      .typeError('El Numero no es valido'),
    notas: '',
  });

  const handleSubmit = async (values) => {
    try {
      let respuesta;
      if (cliente?.id) {
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-type': 'application/json',
          },
        });
      } else {
        const url = import.meta.env.VITE_API_URL;

        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-type': 'application/json',
          },
        });
      }

      await respuesta.json();
      navigate('/clientes');

    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
        {cliente ? 'Editar Cliente' : 'Agregar cliente'}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente ? cliente.nombre : '',
          empresa: cliente ? cliente.empresa : '',
          email: cliente ? cliente.email : '',
          telefono: cliente ? cliente.telefono : '',
          notas: cliente ? cliente.notas : '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={NuevoClienteSchema}
      >
        {({ errors, touched }) => (
          <Form className='mt-10'>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='nombre'>
                Nombre:
              </label>
              <Field
                id='nombre'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Nombre del cliente'
                name='nombre'
              />
              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null}
            </div>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='empresa'>
                Empresa:
              </label>
              <Field
                id='empresa'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Empresa del cliente'
                name='empresa'
              />
            </div>
            {errors.empresa && touched.empresa ? (
              <Alerta>{errors.empresa}</Alerta>
            ) : null}
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='Email'>
                Email:
              </label>
              <Field
                id='Email'
                type='email'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Email del cliente'
                name='email'
              />
              {errors.email && touched.email ? (
                <Alerta>{errors.email}</Alerta>
              ) : null}
            </div>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='Telefono'>
                Teléfono:
              </label>
              <Field
                id='Telefono'
                type='tel'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Teléfono del cliente'
                name='telefono'
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null}
            </div>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='Notas'>
                Notas:
              </label>
              <Field
                as='textarea'
                id='Notas'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50 h-40'
                placeholder='Notas del cliente'
                name='notas'
              />

              <input
                type='submit'
                value={cliente ? 'Editar Cliente' : 'Agregar cliente'}
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer'
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

