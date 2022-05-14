import { Link } from 'react-router-dom'

const Error = () => {
  return (
      <div>
        <h3>Uf! Stranica nije pronađena</h3>
        <Link to='/'>Nazad</Link>
      </div>
  )
}

export default Error
