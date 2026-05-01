import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSuperhero, deleteSuperhero } from '../api'
import logo from '../assets/logo.png'
import cuadro from '../assets/cuadro.png'
import lineas from '../assets/lineas.png'
import nubes from '../assets/nubes.png'

function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hero, setHero] = useState(null)
  const [fotoActual, setFotoActual] = useState(0)
  const [bioExpandida, setBioExpandida] = useState(false)
  const [confirmarEliminar, setConfirmarEliminar] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    getSuperhero(id)
      .then(res => setHero(res.data))
      .catch(err => console.error(err))
  }, [id])

  const handleEliminar = async () => {
    try {
      await deleteSuperhero(id)
      setMensaje({ tipo: 'exito', texto: 'Personaje eliminado correctamente' })
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error al eliminar el personaje' })
    }
  }

  const irFoto = (dir) => {
    const inicio = Math.floor(fotoActual / 3) * 3
    const max = Math.min(inicio + 3, hero.images.length)
    const siguiente = fotoActual + dir
    if (siguiente >= 0 && siguiente < hero.images.length) setFotoActual(siguiente)
  }

  if (!hero) return <div className="page"><p style={{ padding: 40 }}>Cargando...</p></div>

  const palabras = hero.biography.split(' ')
  const bioLarga = palabras.length > 90
  const bioCorta = palabras.slice(0, 90).join(' ') + '...'
  const inicioCarrusel = Math.floor(fotoActual / 3) * 3
  const fotosCarrusel = hero.images.slice(inicioCarrusel, inicioCarrusel + 3)

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
          <button onClick={() => navigate(-1)} className="nav-btn">Volver</button>
        </div>
      </div>

      {/* NUBES */}
      <img src={nubes} alt="" className="nubes" />

      {/* DETALLE */}
      <main className="detalle-section">

        {mensaje && (
          <div className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</div>
        )}

        <div className="detalle-grid">

          {/* COLUMNA IZQUIERDA - FOTOS */}
          <div className="detalle-fotos">
            <div className="detalle-foto-principal">
              <img src={hero.images[fotoActual]} alt={hero.name} className="detalle-img-grande" />
            </div>

            {hero.images.length > 1 && (
              <div className="detalle-carrusel">
                <button className="carrusel-btn" onClick={() => irFoto(-1)}>‹</button>
                <div className="carrusel-miniaturas">
                  {fotosCarrusel.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className={`carrusel-miniatura ${fotoActual === inicioCarrusel + i ? 'activa' : ''}`}
                      onClick={() => setFotoActual(inicioCarrusel + i)}
                    />
                  ))}
                </div>
                <button className="carrusel-btn" onClick={() => irFoto(1)}>›</button>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA - INFO */}
          <div className="detalle-info">

            <h1
              className="detalle-nombre"
              style={{ color: hero.house === 'Marvel' ? '#e23636' : '#0074e8' }}
            >
              {hero.name}
            </h1>

            {hero.realName && (
              <p className="detalle-nombre-real">{hero.realName} · {hero.year}</p>
            )}
            {!hero.realName && (
              <p className="detalle-nombre-real">{hero.year}</p>
            )}

            <div className="detalle-bio">
              <p>{bioExpandida || !bioLarga ? hero.biography : bioCorta}</p>
              {bioLarga && (
                <button
                  className="bio-btn"
                  onClick={() => setBioExpandida(!bioExpandida)}
                >
                  {bioExpandida ? 'Leer menos' : 'Leer más'}
                </button>
              )}
            </div>

            {hero.equipment && (
              <p className="detalle-equipamiento">
                <span>Equipamiento:</span> {hero.equipment}
              </p>
            )}

            <div className="detalle-botones">
              <div className="agregar-wrapper">
                <div className="agregar-fill" />
                <img src={cuadro} alt="" className="agregar-bg" />
                <button
                  className="agregar-btn"
                  onClick={() => navigate(`/editar/${hero._id}`)}
                >
                  Actualizar
                </button>
              </div>

              <div className="agregar-wrapper">
                <div className="agregar-fill" style={{ backgroundColor: '#ff4d4d' }} />
                <img src={cuadro} alt="" className="agregar-bg" />
                <button
                  className="agregar-btn"
                  onClick={() => setConfirmarEliminar(true)}
                >
                  Eliminar
                </button>
              </div>
            </div>

            {confirmarEliminar && (
              <div className="confirmar-box">
                <p>¿Seguro que querés eliminar a {hero.name}?</p>
                <div className="confirmar-botones">
                  <button className="confirmar-si" onClick={handleEliminar}>Sí, eliminar</button>
                  <button className="confirmar-no" onClick={() => setConfirmarEliminar(false)}>Cancelar</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

    </div>
  )
}

export default Detalle