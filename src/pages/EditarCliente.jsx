import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom"
import { obtenerCliente, editarCliente } from "../data/Clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({params}){
    
   const cliente = await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
    }
   return cliente
}

export async function action({request, params}){
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

    //Actualizar cliente
    await editarCliente(params.clienteId, datos)
  
    return redirect('/')
}

const EditarCliente = () => {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">A continuación podrás modificar los campos de los clientes</p>

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
          method='PUT'
          noValidate
        >
          <Formulario cliente={cliente}/>
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

export default EditarCliente