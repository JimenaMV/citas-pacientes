import React, { useState } from "react"
import uuid from "uuid/dist/v4"
import PropTypes from "prop-types"

const Formulario = ({ createAppointment }) => {
  //Crear state de citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  })
  //En caso de que falle la validación, el error pasa a ser true
  const [error, setError] = useState(false)

  //Función que se ejecuta cada que el usuario escribe en un input

  const handleSetDate = (e) => {
    /* console.log(e.target.name) */
    /* console.log(e.target.value) */
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    })
  }

  //Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita

  //Cuando el ususrio presiona agregar cita, osea cuando se envia el formulario

  const submitDate = (e) => {
    e.preventDefault()
    /* console.log("Enviando form") */

    //Validar, siempre en la validación cuando hay un problema se agrega un return para que no se continúe ejecutando el código
    /* ∫ */
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      /* console.log("Hay un error") */
      setError(true)
      return
    }

    //Eliminar el mensaje previo de validacion
    setError(false)

    //Asignar un ID
    cita.id = uuid()
    /* console.log(date) */

    //Crear la cita
    createAppointment(cita)

    //Reiniciar el form
    setCita({ mascota: "", propietario: "", fecha: "", hora: "", sintomas: "" })
  }

  return (
    <>
      <h2>Crear cita</h2>
      {error ? (
        <p className='alerta-error'>Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitDate}>
        <label>Nombre de mascota</label>
        <input
          type='text'
          name='mascota'
          className='u-full-width'
          placeholder='Nombre Mascota'
          onChange={handleSetDate}
          value={mascota}
        />
        <label>Nombre del dueño</label>
        <input
          type='text'
          name='propietario'
          className='u-full-width'
          placeholder='Nombre dueño de la mascota'
          onChange={handleSetDate}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type='date'
          name='fecha'
          className='u-full-width'
          onChange={handleSetDate}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type='time'
          name='hora'
          className='u-full-width'
          onChange={handleSetDate}
          value={hora}
        />
        <label>Síntomas</label>
        <textarea
          className='u-full-width'
          name='sintomas'
          onChange={handleSetDate}
          value={sintomas}
        ></textarea>
        <button
          type='submit'
          className='u-full-width button-primary'
          onChange={handleSetDate}
        >
          Agregar cita
        </button>
      </form>
    </>
  )
}

//Documentando componentes
Formulario.propTypes = {
  createAppointment: PropTypes.func.isRequired,
}
export default Formulario
