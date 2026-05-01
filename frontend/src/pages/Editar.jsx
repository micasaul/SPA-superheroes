import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSuperhero, updateSuperhero } from '../api'
import Header from '../components/Header'
import cuadro from '../assets/cuadro.png'
import cuadroL from '../assets/cuadro-l.png'
import cuadradoCard from '../assets/cuadrado-card.png'
import colores from '../assets/colores.png'

function Editar() {
  const { id } = useParams()
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

  useEffect(() => {
    getSuperhero(id)
      .then(res => {
        const h = res.data
        setForm({
          name: h.name,
          realName: h.realName || '',
          year: h.year,
          house: h.house,
          biography: h.biography,
          equipment: h.equipment || '',
        })
        setImagenes(h.images.length > 0 ? h.images : [''])
      })
      .catch(err => console.error(err))
  }, [id])

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
      await updateSuperhero(id, { ...form, images: imagenes.filter(i => i.trim() !== '') })
      setMensaje({ tipo: 'exito', texto: 'Personaje actualizado correctamente' })
      setTimeout(() => navigate(`/personaje/${id}`), 1500)
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error al actualizar el personaje' })
    }
  }

  return (
    <div className="page">

      <Header
        botones={[
          { texto: 'Marvel', ruta: '/marvel' },
          { texto: 'DC', ruta: '/dc' }
        ]}
      />

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
              <p className="fotos-titulo">Fotos</p>
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

      <footer className="footer">
        <img src={colores} alt="" className="footer-colores" />
      </footer>

    </div>
  )
}

export default Editar