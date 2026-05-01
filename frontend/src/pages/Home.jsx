import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSuperheroes } from '../api'
import SuperheroCard from '../components/SuperheroCard'
import logo from '../assets/logo.png'
import cuadro from '../assets/cuadro.png'
import lineas from '../assets/lineas.png'
import nubes from '../assets/nubes.png'
import colores from '../assets/colores.png'

function Home() {
  const [superheroes, setSuperheroes] = useState([])
  const [filtro, setFiltro] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getSuperheroes()
      .then(res => setSuperheroes(res.data))
      .catch(err => console.error(err))
  }, [])

  const filtrados = superheroes.filter(h =>
    h.name.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="page">

      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" />
        <div className="search-wrapper">
          <img src={cuadro} alt="" className="search-bg" />
          <input
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      {/* NAVEGACIÓN */}
      <div className="nav-wrapper">
        <img src={lineas} alt="" className="nav-lineas" />
        <div className="nav-buttons">
          <button onClick={() => navigate('/marvel')} className="nav-btn">Marvel</button>
          <button onClick={() => navigate('/dc')} className="nav-btn">DC</button>
        </div>
      </div>

      {/* NUBES */}
      <img src={nubes} alt="" className="nubes" />

      {/* CARDS */}
      <main className="cards-section">
        <div className="cards-grid">
          {filtrados.map(hero => (
            <SuperheroCard key={hero._id} superhero={hero} />
          ))}
        </div>

        {/* BOTÓN AGREGAR */}
        <div className="agregar-wrapper">
          <div className="agregar-fill" />
          <img src={cuadro} alt="" className="agregar-bg" />
          <button className="agregar-btn">+ Agregar personaje</button>
        </div>
      </main>

      {/* PIE */}
      <footer className="footer">
        <img src={colores} alt="" className="footer-colores" />
      </footer>

    </div>
  )
}

export default Home