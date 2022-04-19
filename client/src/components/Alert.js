import { useAppContext } from '../context/appContext'

const Alert = () => {
  const { alertType, alertText } = useAppContext()
  return <button autoFocus className={`alert alert-${alertType} member-btn`}>{alertText}</button>
}

export default Alert
