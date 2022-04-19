import React from "react";
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { trophies, bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy } from "../assets/trophies/index";

const Social = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();

  return (
    <div className='ps5-modal-dialog'>
      <button type='button' className='dropdown-btn' onClick={logoutUser}>
        logout
      </button>
      <h2>Hi!</h2>
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
