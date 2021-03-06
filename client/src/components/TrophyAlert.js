import { useAppContext } from "../context/appContext";
import { bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy } from "../assets/trophies/index";
import "./TrophyAlert.scss";

const TrophyAlert = ({ isTrophyActive }) => {
  const { trophyType, trophyText } = useAppContext();

  return (
    <div className={`trophy-earned ${isTrophyActive}`}>
      <div className='trophy-earned-content'>
        <img
          src={
            trophyType === "bronze"
              ? bronzeTrophy
              : trophyType === "silver"
              ? silverTrophy
              : trophyType === "gold"
              ? goldTrophy
              : platinumTrophy
          }
          alt='trofej'
        />
        <div className='message'>
          <span className='trophy-earned-text'>{trophyText}</span>
          <p>Trofej osvojen!</p>
        </div>
      </div>
    </div>
  );
};
export default TrophyAlert;
