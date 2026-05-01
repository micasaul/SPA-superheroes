import cuadradoCard from '../assets/cuadrado-card.png'
import cuadradoCardVertical from '../assets/cuadrado-card-vertical.png'

function SuperheroCard({ superhero, orientacion, gridStyle, onClick }) {
  const biografiaTruncada = superhero.biography.length > 120
    ? superhero.biography.substring(0, 120) + '...'
    : superhero.biography

  return (
    <div className={`card-wrapper card-${orientacion}`} style={gridStyle} onClick={onClick}>
      <img
        src={orientacion === 'vertical' ? cuadradoCardVertical : cuadradoCard}
        alt=""
        className="card-bg"
      />
      {superhero.images?.[0] && (
        <img
          src={superhero.images[0]}
          alt={superhero.name}
          className="card-hero-img"
        />
      )}
      <div className="card-overlay" />
      <div className="card-content">
        <div className="card-hover-content">
          <h3 className="card-name">{superhero.name}</h3>
          {superhero.realName && (
            <p className="card-realname">{superhero.realName}</p>
          )}
          <p className="card-bio">{biografiaTruncada}</p>
        </div>
      </div>
    </div>
  )
}

export default SuperheroCard