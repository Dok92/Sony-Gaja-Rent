import { useAppContext } from "../../context/appContext";
import plus from "../../assets/plus.png";

const Avatar = () => {
  const { user } = useAppContext();
  return (
    <>
      <img src={plus} className='plus' alt=''></img>
      <h3 id='profile-label'>{user.name}</h3>
    </>
  );
};

export default Avatar;
