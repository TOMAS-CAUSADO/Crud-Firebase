import React, {useState, useEffect} from 'react'
import {db} from '.../firebase'
import {collection, doc, addDoc} from 'firebase/firestore'

const Formulario = () => {

    const [empleado, setEmpleado] = useState('')
    const [id, setID] = useState('')
    const [labor, setLabor] = useState('')
    const [htrabajadas, setHtrabajadas] = useState('')
    const [hdescanso, setHdescanson] = useState('')
    const [sueldo, setSueldo] = useState('')
    const [informacion, setInformacion] = useState('')
    const [listaTrabajadores, setListaTrabajadores] = useState([])

    useEffect(()=>{
        const obtenerDatos = async()=>{

            try {
                await onSnapshot(collection(db, 'REACT-FIREBASE'), (query)=>{
                    setListaTrabajadores(query.doc.map((doc)=>({...doc.data(), id:doc.id})))
                })
            } catch (error) {
                console.log(error);
            }
        }

        obtenerDatos();
        console.log(listaTrabajadores);
    })

    const guardarEmpleado = async(e)=>{
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'Empleados'),{
                nombreNEmpleado: nempleado,
                nombreID: id,
                nombreLabor: labor,
                nombreHtrabajo: HorasTrabajadas,
                nombreHdescanso: HorasDescanso,
                nombreSueldo: sueldo,
                nombreInformacion: informacion
            })
            setListaTrabajadores([
                ...listaTrabajadores,{
                    nombreNEmpleado: nempleado,
                    nombreID: id,
                    nombreLabor: labor,
                    nombreHtrabajo: HorasTrabajadas,
                    nombreHdescanso: HorasDescanso,
                    nombreSueldo: sueldo,
                    nombreInformacion: informacion
                }
            ])

            setEmpleado('')
            setID('')
            setLabor('')
            setHtrabajadas('')
            setHdescanson('')
            setSueldo('')
            setInformacion('')

        } catch (error) {
            console.log(Error)
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'> CRUD</h1>
        <hr />
        <div className='col-8'>
            <h4 className='text-center'>Listado de Empleados</h4>
            <ul className='list-group'>
                <li className='list-group-item'>EMPLEADO 1</li>
                <li className='list-group-item'>EMPLEADO 2</li>
            </ul>
            <div className='col-4'>
                <h4 className='text-center'>AGREGAR EMPLEADO</h4>
                <form onSubmit={guardarEmpleado}>
                    <input type="text" className='form-control mb-2' placeholder='Nombre Empleado' 
                    value={nempleado} onChange ={(e)=>setEmpleado(e.target.value)}/>
                    <input type="text" className='form-control mb-2' placeholder='ID'
                    value={id} onChange ={(e)=>setID(e.target.value)}/>
                    <input type="text" className='form-control mb-2' placeholder='Labor' 
                    value={labor} onChange ={(e)=>setLabor(e.target.value)}/>
                    <input type="text" className='form-control mb-2' placeholder='Horas de Trabajo'
                    value={HorasTrabajadas} onChange ={(e)=>setHtrabajadas(e.target.value)}/>
                    <input type="text" className='form-control mb-2' placeholder='Horas de Descanso'
                     value={HorasDescanso} onChange ={(e)=>setHdescanson(e.target.value)}/>
                    <input type="text" className='form-control mb-2' placeholder='Cantidad Sueldo'
                    value={sueldo} onChange ={(e)=>setSueldo(e.target.value)}/>
                    <input type="text" className='form-control mb-2' placeholder='Informacion'
                    value={informacion} onChange ={(e)=>setInformacion(e.target.value)}/>
                    <button className='btn btn-primary btn-block' on='submit'>EDITAR</button>
                    <button className='btn btn-dark btn-block mx-2'>CANCELAR</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Formulario