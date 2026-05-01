import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import cuadro from '../assets/cuadro.png'
import lineas from '../assets/lineas.png'
import nubes from '../assets/nubes.png'

function Header({ botones, onBuscar }) {
  const [filtro, setFiltro] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleBuscar = () => {
    if (onBuscar) {
      onBuscar(filtro)
    } else {
      navigate(`/?busqueda=${encodeURIComponent(filtro)}`)
    }
  }

  const getColorActivo = (ruta) => {
    if (location.pathname === ruta) {
      if (ruta === '/marvel') return '#e23636'
      if (ruta === '/dc') return '#0074e8'
    }
    return '#111'
  }

  return (
    <>
      <header className="header">
        <button onClick={() => navigate('/')} className="nav-btn"><img src={logo} alt="Logo" className="header-logo" /></button>
        <div className="search-wrapper">
          <img src={cuadro} alt="" className="search-bg" />
          <input
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleBuscar()}
            className="search-input"
          />
        </div>
      </header>

      <div className="nav-wrapper">
        <img src={lineas} alt="" className="nav-lineas" />
        <div className="nav-buttons">
          {botones.map((btn, i) => (
            <button
              key={i}
              onClick={() => btn.ruta === -1 ? navigate(-1) : navigate(btn.ruta)}
              className="nav-btn"
              style={{ color: getColorActivo(btn.ruta) }}
            >
              {btn.texto}
            </button>
          ))}
        </div>
      </div>

      <img src={nubes} alt="" className="nubes" />
    </>
  )
}

export default Header