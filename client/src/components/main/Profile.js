import { useEffect } from "react";
import dayjs from "dayjs";
import { useAppContext } from "../../context/appContext";
import ps4Controller2 from "../../assets/ps4/ps4-2.png";
import ps4Controller4 from "../../assets/ps4/ps4-4.png";
import ps5Controller2 from "../../assets/ps5//console_5-2.png";
import ps5Controller4 from "../../assets/ps5//console_5-4.png";
import FormRowSelect from "../FormRowSelect";
import "./Profile.scss";

const Profile = () => {
  const { rents, getRents, sort, sortOptions, handleChange } = useAppContext();

  dayjs.locale("sr"); // date locale format
  
  useEffect(() => {
    getRents();
  }, [sort]);

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div>
      <form className='sort'>
        <h4>Rentiranja</h4>
        <div className='sort-center'>
          <FormRowSelect
            labelText='sortiraj:'
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <td>Konzola</td>
            <td>Dana</td>
            <td>Cena</td>
            <td>Datum</td>
          </tr>
        </thead>
      </table>
      <div className='tbl-content'>
        <table>
          <tbody>
            {rents.map((rent) => {
              const { _id, createdAt, console, days, controllers, projector, price } = rent;
              const consoleImg =
                console === "ps4" && controllers === 2
                  ? ps4Controller2
                  : console === "ps4" && controllers === 4
                  ? ps4Controller4
                  : console === "ps5" && controllers === 2
                  ? ps5Controller2
                  : ps5Controller4;

              return (
                <tr key={_id}>
                  <td>
                    <img src={consoleImg} alt='playstation konzola' />
                    {projector !== "Ne" && projector !== "" ? " uz projektor " + projector : ""}
                  </td>
                  <td>{days}</td>
                  <td>{price}</td>
                  <td>{dayjs(createdAt).format("D.MM.YYYY")}<br />{dayjs(createdAt).format("HH:mm")} časova</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Profile;
