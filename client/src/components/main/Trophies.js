import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { bronzeTrophy, silverTrophy, goldTrophy, platinumTrophy } from '../../assets/trophies/index'
import dayjs from "dayjs";  
import "./Profile.scss";

const Trophies = () => {
  const { 
    trophyRents,
    getTrophyRents, 
  } = useAppContext();

  useEffect(() => { 
    getTrophyRents();
  }, []);

  dayjs.locale('sr')

  return (
    <div>     
    <form className='sort'>
      <h4>Trofeji</h4>
    </form>
    <table>
      <thead>
        <tr> 
          <td>Trofej</td>
          <td>Osvojen trofej</td>
          <td>Datum</td>
        </tr> 
      </thead>
    </table>
    <div className='tbl-content'>
      <table>
        <tbody>
          {trophyRents.map((trophyRent) => {
            const { _id, createdAt, trophy } = trophyRent;

            const trophyData = 
              trophy[0] === 'bronze' ? { img: bronzeTrophy, text: 'Prva porudžbina Sledeća renta: 20% popusta!' }
              : trophy[0] === 'silver' ? { img: silverTrophy, text: 'Peta porudžbina Sledeća renta: 50% popusta!' }
              : trophy[0] === 'gold' ? { img: goldTrophy, text: 'Gratis sledeća renta!' }
              : { img: platinumTrophy,  text: '10% popusta na sve naredne rente' };
            
            return (
              <tr key={_id}>
                <td><img src={trophyData.img} alt="trofej"/></td>
                <td>{trophyData.text}</td>
                <td>{dayjs(createdAt).format('D.MM.YYYY')}<br />{dayjs(createdAt).format("HH:mm")} časova</td> 
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}
export default Trophies