import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {FiLogOut} from "react-icons/fi";
import { bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy } from "../../assets/trophies/index";
import plus from '../../assets/plus.png'
import avatar from '../../assets/user-1.jpg';

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
      setTrophy({...trophy, bronze: 'won'})
    } else if(totalRents > 4 && totalRents < 10) {
      setTrophy({...trophy, silver: 'won', bronze: 'won'})
    } else if (totalRents >= 10) {
      setTrophy({...trophy, platinum: 'won', gold: 'won', silver: 'won', bronze: 'won'})
    }
  }, [totalRents])



  // useEffect(() => {
  //     if(totalRents > 0 && totalRents < 5) {
  //       return setTrophy('bronze');
  //     } else if (totalRents > 4 && totalRents < 10) {
  //       return setTrophy('silver');
  //     } else if (totalRents === 10) {
  //       return setTrophy('gold'); 
  //     }
  //     return setTrophy('platinum');     
  // })

  const { bronze, silver, gold, platinum } = trophy;

  return (
    <div className='ps5-modal-dialog'>
      <div className="user-active"><img src={avatar} className="avatar" alt=''></img></div>
    <div className="avatar-plus">
        <h2>{user.name} </h2>
        <img src={plus} className="plus" alt=''></img>        
      </div>    
      <div className="trophies-wrapper">
        <img className={`trophy ${bronze}`} src={bronzeTrophy} alt='' />
        <img className={`trophy ${silver}`} src={silverTrophy} alt='' />
        <img className={`trophy ${gold}`} src={goldTrophy} alt='' />
        <img className={`trophy ${platinum}`} src={platinumTrophy} alt='' /> 
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
