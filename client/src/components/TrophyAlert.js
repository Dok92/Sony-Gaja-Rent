import { useAppContext } from '../context/appContext'
import { bronzeTrophy, silverTrophy, goldTrophy } from '../assets/trophies/index';

const TrophyAlert = ({isTrophyActive}) => {
  const { trophyType, trophyText } = useAppContext()

  return (
    <div className={`trophy-earned ${isTrophyActive}`}>
      <div className='trophy-earned-content'>
          <img src={trophyType === "bronze" ? bronzeTrophy : trophyType === "silver" ? silverTrophy : goldTrophy} alt='trofej' />
        <div className='message'>
          {/* <span className='text text-1'>{trophyType}</span> */}
          <span className='trophy-earned-text'>{trophyText}</span>
          <p>Trofej osvojen!</p>
        </div>
      </div>
    </div>
  );
};
export default TrophyAlert;
