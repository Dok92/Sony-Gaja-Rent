import React from "react";
import { useAppContext } from "../../context/appContext";
import {FiLogOut} from "react-icons/fi";
import { bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy } from "../../assets/trophies/index";
import plus from '../../assets/plus.png'
import avatar from '../../assets/user-1.jpg';

const Social = () => {
  const { logoutUser, user } = useAppContext();

  return (
    <div className='ps5-modal-dialog'>
      <div className="user-active"><img src={avatar} className="avatar" alt=''></img></div>
    <div className="avatar-plus">
        <h2>{user.name} </h2>
        <img src={plus} className="plus" alt=''></img>        
      </div>    
      <div className="trophies-wrapper">
        <img className="trophy trophy-bronze" src={bronzeTrophy} alt='' />
        <img className="trophy trophy-silver" src={silverTrophy} alt='' />
        <img className="trophy trophy-gold" src={goldTrophy} alt='' />
        <img className="trophy trophy-platinum" src={platinumTrophy} alt='' />
        {/* <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p> */}
      </div>
        <div className="line"></div>
      <div className="edit-logout">
        {/* <div className="edit">
          <FaUserEdit/>       
          <p>izmeni profil</p>
        </div> */}
        <div className="logout">
          <FiLogOut onClick={logoutUser}/>       
          <p>izloguj se</p>
        </div>
      </div>
      {/* <h2><FaPhone />062252554</h2> */}
      {/* <h2>{user.location}<FaLocationArrow />Novi Sad</h2> */}
    </div>
  );
};

export default Social;