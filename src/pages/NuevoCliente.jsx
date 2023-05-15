/* eslint-disable no-control-regex */
import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/Clientes'

export async function action({request}){
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)

  const email = formData.get('email')
  //Validar campos vacios
  const errores = []
  if(Object.values(datos).includes("")){
    errores.push("Llena todos los campos")
  } 
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)){
    errores.push('El emailno es valido')
  }
  
  if(Object.keys(errores).length){
    return errores
  }
  await agregarCliente(datos)

  return redirect('/')
}

const NuevoCliente = () => {
  const errores = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un cliente</p>

      <div className="flex justify-end">
        <button 
          onClick={() => navigate(-1)}
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>
      {errores?.length && errores.map((error, index) => (
        <Error key={index}>{error}</Error>
      ))}
        <Form
          method='POST'
          noValidate
        >
          <Formulario />
          <input 
              type="submit"
              className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 cursor-pointer"
              value="Registrar cliente"
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente