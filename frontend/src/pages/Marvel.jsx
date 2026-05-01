import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMarvel } from '../api'
import SuperheroCard from '../components/SuperheroCard'
import logo from '../assets/logo.png'
import cuadro from '../assets/cuadro.png'
import lineas from '../assets/lineas.png'
import nubes from '../assets/nubes.png'
import colores from '../assets/colores.png'

function Marvel() {
  const [superheroes, setSuperheroes] = useState([])
  const [filtro, setFiltro] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getMarvel()
      .then(res => setSuperheroes(res.data))
      .catch(err => console.error(err))
  }, [])

  const filtrados = superheroes.filter(h =>
    h.name.toLowerCase().includes(filtro.toLowerCase())
  )

  const getGridStyle = (index) => {
    const pos = index % 8
    const grupo = Math.floor(index / 8)
    const offset = grupo * 4

    const estilos = [
      { gridColumn: '1 / 3', gridRow: `${1 + offset} / ${2 + offset}` },
      { gridColumn: '1 / 3', gridRow: `${2 + offset} / ${3 + offset}` },
      { gridColumn: '3 / 4', gridRow: `${1 + offset} / ${3 + offset}` },
      { gridColumn: '4 / 5', gridRow: `${1 + offset} / ${3 + offset}` },
      { gridColumn: '1 / 2', gridRow: `${3 + offset} / ${5 + offset}` },
      { gridColumn: '2 / 3', gridRow: `${3 + offset} / ${5 + offset}` },
      { gridColumn: '3 / 5', gridRow: `${3 + offset} / ${4 + offset}` },
      { gridColumn: '3 / 5', gridRow: `${4 + offset} / ${5 + offset}` },
    ]
    return estilos[pos]
  }

  const getOrientacion = (index) => {
    const pos = index % 8
    return pos === 0 || pos === 1 || pos === 6 || pos === 7
      ? 'horizontal'
      : 'vertical'
  }

  return (
    <div className="page">
      <header className="header">
        <button onClick={() => navigate('/')} className="nav-btn"><img src={logo} alt="Logo" className="header-logo" /></button>
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

      <div className="nav-wrapper">
        <img src={lineas} alt="" className="nav-lineas" />
        <div className="nav-buttons">
          <button onClick={() => navigate('/marvel')} className="nav-btn">Marvel</button>
          <button onClick={() => navigate('/dc')} className="nav-btn">DC</button>
        </div>
      </div>

      <img src={nubes} alt="" className="nubes" />

      <main className="cards-section">
        <div className="cards-grid">
          {filtrados.map((hero, index) => (
            <SuperheroCard
              key={hero._id}
              superhero={hero}
              orientacion={getOrientacion(index)}
              gridStyle={getGridStyle(index)}
            />
          ))}
        </div>
        <div className="agregar-wrapper">
          <div className="agregar-fill" />
          <img src={cuadro} alt="" className="agregar-bg" />
          <button className="agregar-btn" onClick={() => navigate('/agregar')}>+ Agregar personaje</button>
        </div>
      </main>

      <footer className="footer">
        <img src={colores} alt="" className="footer-colores" />
      </footer>
    </div>
  )
}

export default Marvel