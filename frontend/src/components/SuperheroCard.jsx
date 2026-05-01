import cuadradoCard from '../assets/cuadrado-card.png'

function SuperheroCard({ superhero }) {
  const biografiaTruncada = superhero.biography.length > 120
    ? superhero.biography.substring(0, 120) + '...'
    : superhero.biography

  return (
    <div className="card-wrapper">
      <img src={cuadradoCard} alt="" className="card-bg" />
      <div className="card-content">
        <h3 className="card-name">{superhero.name}</h3>
        {superhero.realName && (
          <p className="card-realname">{superhero.realName}</p>
        )}
        <p className="card-bio">{biografiaTruncada}</p>
      </div>
    </div>
  )
}

export default SuperheroCard