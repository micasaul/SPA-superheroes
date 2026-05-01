import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSuperhero } from '../api'
import logo from '../assets/logo.png'
import cuadro from '../assets/cuadro.png'
import cuadroL from '../assets/cuadro-l.png'
import cuadradoCard from '../assets/cuadrado-card.png'
import lineas from '../assets/lineas.png'
import nubes from '../assets/nubes.png'

function Agregar() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    realName: '',
    year: '',
    house: 'Marvel',
    biography: '',
    equipment: '',
  })
  const [imagenes, setImagenes] = useState([''])
  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImagenChange = (index, value) => {
    const nuevas = [...imagenes]
    nuevas[index] = value
    setImagenes(nuevas)
  }

  const agregarImagen = () => setImagenes([...imagenes, ''])

  const handleSubmit = async () => {
    try {
      await createSuperhero({ ...form, images: imagenes.filter(i => i.trim() !== '') })
      setMensaje({ tipo: 'exito', texto: 'Personaje guardado correctamente' })
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error al guardar el personaje' })
    }
  }

  return (
    <div className="page">

      {/* HEADER */}
      <header className="header">
        <button onClick={() => navigate('/')} className="nav-btn"><img src={logo} alt="Logo" className="header-logo" /></button>
      </header>

      {/* NAVEGACIÓN */}
      <div className="nav-wrapper">
        <img src={lineas} alt="" className="nav-lineas" />
        <div className="nav-buttons">
          <button onClick={() => navigate('/')} className="nav-btn">Volver</button>
        </div>
      </div>

      {/* NUBES */}
      <img src={nubes} alt="" className="nubes" />

      {/* FORMULARIO */}
      <main className="form-section">

        {mensaje && (
          <div className={`mensaje mensaje-${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        <div className="form-grid">

          {/* COLUMNA IZQUIERDA - FOTOS */}
          <div className="form-fotos">
            <div className="fotos-box">
              <p className="fotos-titulo">Agregar fotos</p>
              {imagenes.map((img, index) => (
                <div key={index} className="foto-input-wrapper">
                  <img src={cuadroL} alt="" className="foto-input-bg" />
                  <input
                    type="text"
                    placeholder={`URL imagen ${index + 1}`}
                    value={img}
                    onChange={e => handleImagenChange(index, e.target.value)}
                    className="foto-input"
                  />
                </div>
              ))}
              <button className="foto-agregar-btn" onClick={agregarImagen}>
                + otra foto
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA - CAMPOS */}
          <div className="form-campos">

            <div className="campo-wrapper">
              <img src={cuadroL} alt="" className="campo-bg" />
              <input
                type="text"
                name="name"
                placeholder="Nombre del personaje"
                value={form.name}
                onChange={handleChange}
                className="campo-input"
              />
            </div>

            <div className="campo-wrapper">
              <img src={cuadroL} alt="" className="campo-bg" />
              <input
                type="text"
                name="realName"
                placeholder="Nombre real (opcional)"
                value={form.realName}
                onChange={handleChange}
                className="campo-input"
              />
            </div>

            <div className="form-fila">
              <div className="campo-wrapper campo-anio">
                <img src={cuadro} alt="" className="campo-bg" />
                <input
                  type="number"
                  name="year"
                  placeholder="Año"
                  value={form.year}
                  onChange={handleChange}
                  className="campo-input"
                />
              </div>

              <div className="campo-wrapper campo-casa">
                <img src={cuadro} alt="" className="campo-bg" />
                <select
                  name="house"
                  value={form.house}
                  onChange={handleChange}
                  className="campo-input"
                >
                  <option value="Marvel">Marvel</option>
                  <option value="DC">DC</option>
                </select>
              </div>
            </div>

            <div className="campo-wrapper campo-bio">
              <img src={cuadradoCard} alt="" className="campo-bg" />
              <textarea
                name="biography"
                placeholder="Biografía"
                value={form.biography}
                onChange={handleChange}
                className="campo-input campo-textarea"
              />
            </div>

            <div className="campo-wrapper">
              <img src={cuadroL} alt="" className="campo-bg" />
              <input
                type="text"
                name="equipment"
                placeholder="Equipamiento (opcional)"
                value={form.equipment}
                onChange={handleChange}
                className="campo-input"
              />
            </div>

            {/* BOTÓN GUARDAR */}
            <div className="agregar-wrapper form-guardar">
              <div className="agregar-fill" />
              <img src={cuadro} alt="" className="agregar-bg" />
              <button className="agregar-btn" onClick={handleSubmit}>
                Guardar
              </button>
            </div>

          </div>
        </div>
      </main>

    </div>
  )
}

export default Agregar