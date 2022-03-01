import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IniciarSesion } from './layout/IniciarSesion';
import { Layout } from './layout/Layout';
import { EditarCliente } from './pages/EditarCliente';
import { Incio } from './pages/Incio';
import { LoginForm } from './pages/LoginForm';
import { NuevoCliente } from './pages/NuevoCliente';
import { VerCliente } from './pages/VerCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* <Route path='/' element={<IniciarSesion />}>
          <Route index element={<LoginForm />}></Route>
        </Route> */}

        <Route path='/clientes' element={<Layout />}>
          <Route index element={<Incio />} />
          <Route path='nuevo' element={<NuevoCliente />} />
          <Route path='editar/:id' element={<EditarCliente />} />
          <Route path=':id' element={<VerCliente />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;