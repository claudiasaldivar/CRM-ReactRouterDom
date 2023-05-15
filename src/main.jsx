import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layouts from './components/Layouts'
import NuevoCliente, {action as clienteNuevo} from './pages/NuevoCliente'
import EditarCliente, {loader as editarClienteLoader, action as clienteEditar} from './pages/EditarCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import {action as eliminarCliente} from './components/Cliente'

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: clienteNuevo,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: clienteEditar,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarCliente,
        errorElement: <ErrorPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
)
