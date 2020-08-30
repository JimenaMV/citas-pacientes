import React, { useState, useEffect } from "react"
import Formulario from "./components/Formulario/Formulario"
import Cita from "./components/Cita/Cita"

function App() {
  // Citas en local storage solo almacena strings
  let initialAppointments = JSON.parse(localStorage.getItem("citas"))
  if (!initialAppointments) {
    initialAppointments = []
  }
  //Arreglo de citas
  /* const [citas, setCitas] = useState([initialAppointments]) */
  const [citas, setCitas] = useState(initialAppointments)

  //useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let initialAppointments = JSON.parse(localStorage.getItem("citas"))
    /* console.log("Documento listo") */
    if (initialAppointments) {
      localStorage.setItem("citas", JSON.stringify(citas))
    } else {
      localStorage.setItem("citas", JSON.stringify([]))
    }
  }, [citas])

  //Función que tome citas actuales y agregue la nueva
  const createAppointment = (cita) => {
    /* console.log(cita) */
    setCitas([...citas, cita])
  }

  //Función que elimina cita por su id
  const deleteAppointments = (id) => {
    /* console.log(id) */
    const newAppointments = citas.filter((cita) => cita.id !== id)
    setCitas(newAppointments)
  }

  //Mensaje condicional
  /* console.log(citas.length) */
  const title = citas.length === 0 ? "No hay citas" : "Administra tus citas"

  return (
    <>
      <h1>Administrador de Pacientes</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario createAppointment={createAppointment} />
          </div>
          <div className='one-half column'>
            <h2>{title}</h2>
            {citas.map((cita) => (
              <Cita
                key={cita.id}
                cita={cita}
                deleteAppointments={deleteAppointments}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
