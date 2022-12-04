import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'

const Formulario = () => {

    const [empleado, setEmpleado] = useState('')
    const [id, setID] = useState(0)
    const [labor, setLabor] = useState('')
    const [htrabajadas, setHtrabajadas] = useState('')
    const [hdescanso, setHdescanson] = useState('')
    const [sueldo, setSueldo] = useState('')
    const [informacion, setInformacion] = useState('')
    const [listaTrabajadores, setListaTrabajadores] = useState([])
    const [modoedicion, setEdicion] = useState(false)
    //modoEdicion puede que vaya asi

    useEffect(() => {
        const obtenerDatos = async () => {

            try {
                await onSnapshot(collection(db, 'REACT-FIREBASES'), (query) => {
                    setListaTrabajadores(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error);
            }
        }

        obtenerDatos();
        console.log(listaTrabajadores);
    }, [])

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'REACT-FIREBASES', id))
        } catch (error) {
            console.log(error);
        }
    }

    const editar = item => {
        setEmpleado(item.nombreNEmpleado)
        setID(item.id)
        setLabor(item.labor)
        setHtrabajadas(item.htrabajadas)
        setHdescanson(hdescanso)
        setSueldo(item.sueldo)
        setInformacion(item.informacion)
        setmodoEdicion(true)

    }

    const cancelar = () => {
        setEdicion(false)
        setEmpleado('')
        setID('')
        setLabor('')
        setHtrabajadas('')
        setHdescanson('')
        setSueldo('')
        setInformacion('')
    }

    const editarEmpleados = async e => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'empleado', 'id', 'labor', 'htrabajadas', 'hdescanso', 'sueldo', 'informacion')
            await updateDoc(docRef, {
                nombreNEmpleado: empleado,
                nombreID: id,
                nombreLabor: labor,
                nombreHtrabajo: htrabajadas,
                nombreHdescanso: HorasDescanso,
                nombreSueldo: sueldo,
                nombreInformacion: informacion
            })

            const nuevoArray = listaTrabajadores.map(
                item => item.id === id ? { id: id, nombreNEmpleado: empleado, }
            )
        } catch (error) {
            console.log(erroe);
        }
    }

    const guardarEmpleado = async (e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'Empleados'), {
                nombreNEmpleado: empleado,
                nombreID: id,
                nombreLabor: labor,
                nombreHtrabajo: htrabajadas,
                nombreHdescanso: HorasDescanso,
                nombreSueldo: sueldo,
                nombreInformacion: informacion
            })
            setListaTrabajadores([...listaTrabajadores, {
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
                    {
                        listaTrabajadores.map(item => (
                            <li className='list-group-item'>
                                <span className="lead">
                                    {item.nombreNEmpleado}-{item.nombreID}-{item.nombreLabor}-{item.nombreHtrabajo}
                                    -{item.nombreHdescanso}-{item.nombreSueldo}-{item.nombreInformacion}

                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className='btn btn-warning btn-sm float-end mx-2'>Editar</button>
                                </span>

                            </li>
                        ))
                    }
                    <li className='list-group-item'>EMPLEADO 1</li>
                    <li className='list-group-item'>EMPLEADO 2</li>
                </ul>
                <div className='col-4'>
                    <h4 className='text-center'>{modoedicion ? "EDITAR EMPLEADO" : 'AGREGAR EMPLEADO'}</h4>
                    <form onSubmit={guardarEmpleado}>
                        <input type="text" className='form-control mb-2' placeholder='Nombre Empleado'
                            value={nempleado} onChange={(e) => setEmpleado(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='ID'
                            value={id} onChange={(e) => setID(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Labor'
                            value={labor} onChange={(e) => setLabor(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Horas de Trabajo'
                            value={htrabajadas} onChange={(e) => setHtrabajadas(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Horas de Descanso'
                            value={hdescanso} onChange={(e) => setHdescanson(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Cantidad Sueldo'
                            value={sueldo} onChange={(e) => setSueldo(e.target.value)} />
                        <input type="text" className='form-control mb-2' placeholder='Informacion'
                            value={informacion} onChange={(e) => setInformacion(e.target.value)} />

                        {
                            modoedicion ?
                                (
                                    <>
                                        <button className='btn btn-warning btn-block' on='submit'>EDITAR</button>
                                        <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>CANCELAR</button>
                                    </>
                                )
                                :
                                <button className='btn btn-primary btn-block' on='submit'>AGREGAR</button>

                        }


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario