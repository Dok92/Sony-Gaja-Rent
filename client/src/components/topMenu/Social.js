import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {FiLogOut} from "react-icons/fi";
import { bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy } from "../../assets/trophies/index";
import plus from '../../assets/plus.png'
import avatar from '../../assets/user-1.jpg';
import './Social.scss'

const initialState = {
  bronze: "",
  silver: "",
  gold: "",
  platinum: ""
}

const Social = () => {
  const { logoutUser, user, totalRents } = useAppContext();

  const [trophy, setTrophy] = useState(initialState);

  useEffect(() => {
    if(totalRents > 0 && totalRents < 5) {
      setTrophy(t => ({...t, bronze: 'won'}))
    } else if(totalRents > 4 && totalRents < 10) {
      setTrophy(t => ({...t, silver: 'won', bronze: 'won'}))
    } else if (totalRents >= 10) {
      setTrophy(t => ({...t, platinum: 'won', gold: 'won', silver: 'won', bronze: 'won'}))
    }
  }, [totalRents])

  const { bronze, silver, gold, platinum } = trophy;

  return (
    <div className='ps5-modal-dialog'>
      <div className="user-active">
        <img src={avatar} className="avatar" alt=''></img>
      </div>
      <div className="avatar-plus">
        <h2>{user.name} </h2>
        <img src={plus} className="plus" alt=''></img>        
      </div>    
      <div className="trophies-wrapper">
        <img className={`trophy ${bronze}`} src={bronzeTrophy} alt='' />
        <img className={`trophy ${silver}`} src={silverTrophy} alt='' />
        <img className={`trophy ${gold}`} src={goldTrophy} alt='' />
        <img className={`trophy ${platinum}`} src={platinumTrophy} alt='' /> 
      </div>
        <div className="line"></div>
      <div className="edit-logout">
        <div className="logout">
          <FiLogOut onClick={logoutUser}/>       
          <p>izloguj se</p>
        </div>
      </div>
    </div>
  );
};

export default Social;
