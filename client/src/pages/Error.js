import { Link } from 'react-router-dom'

const Error = () => {
  return (
      <div className='error-page'>
        <h1>404</h1>
        <h3>Uf! Stranica nije pronađena.</h3>
          <Link className='ps5-btn ps5-btn-lg ps5-btn-dark' to='/'>Nazad</Link>
      </div>
  )
}

export default Error
