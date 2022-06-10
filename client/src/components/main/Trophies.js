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
            const trophyImg =
              trophy[0] === "bronze" ? bronzeTrophy
                : trophy[0] === "silver" ? silverTrophy
                : trophy[0] === "gold" ? goldTrophy
                : platinumTrophy
            
            return (
              <tr key={_id}>
                <td><img src={trophyImg} alt="trofej"/></td>
                <td>{trophy[1]}</td>
                <td>{dayjs(createdAt).format('D.MM.YYYY')}</td> 
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