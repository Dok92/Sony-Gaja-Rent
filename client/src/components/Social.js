import React from "react";
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { trophies, bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy } from "../assets/trophies/index";
import { FaUserEdit, FaLocationArrow, FaPhone } from 'react-icons/fa';
import plus from '../assets/plus.png'

const Social = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();

  return (
    <div className='ps5-modal-dialog'>
      <button type='button' className='dropdown-btn' onClick={logoutUser}>
        logout
      </button>
      <h2>{user.name}<FaUserEdit /></h2>
      <h2><FaPhone />062252554</h2>
      <h2>{user.location}<FaLocationArrow />Novi Sad</h2>
      <div className="trophies-wrapper">
        <img className="trophy trophy-bronze" src={bronzeTrophy} alt='' />
        <img className="trophy trophy-silver" src={silverTrophy} alt='' />
        <img className="trophy trophy-gold" src={goldTrophy} alt='' />
        <img className="trophy trophy-platinum" src={platinumTrophy} alt='' />
      </div>
    </div>
  );
};

export default Social;
