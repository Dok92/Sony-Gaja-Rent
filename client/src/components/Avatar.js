import { useAppContext } from "../context/appContext";
import plus from '../assets/plus.png'

const Avatar = () => {
  const { user } = useAppContext();
  return (
    <><h3 id="profile-label">{user.name}</h3><img src={plus} className="plus"></img></> 
  ) 
}

export default Avatar;