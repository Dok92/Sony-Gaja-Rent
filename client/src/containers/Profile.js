import "./Profile.scss";
// import moment from "moment";
import ps4Controller2 from "../assets/ps4/ps4-2.png";
import ps4Controller4 from "../assets/ps4/ps4-4.png";
import ps5Controller2 from "../assets/ps5//console_5-2.png";
import ps5Controller4 from "../assets/ps5//console_5-4.png";
import { FaUserEdit, FaAngleDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import { useEffect } from "react";
import dayjs from "dayjs";

// TODO sort, use img alt as text (ps5 or ps4)

const Profile = () => {
  const {
    // isLoading,
    _id,
    // createdAt,
    console,
    days,
    controllers,
    projector,
    rentLocation,
    price,
    rents,
    getRents,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  dayjs.locale('sr')

  useEffect(() => { 
    getRents();
    // eslint-disable-next-line
  }, [sort]);

  const handleSearch = (e) => {
    // if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   clearFilters();
  // };

  return (
    <div>
      <form className='sort'>
        <h4>search form</h4>
        <div className='sort-center'>
          <FormRowSelect labelText="sortiraj:" name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />
          {/* <button
            className='btn btn-block btn-danger'
            // disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button> */}
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <td>Renta</td>
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
                  <td><img src={consoleImg} alt="playstation konzola"/>{projector !== "Ne" && projector !== "" ? ' uz projektor ' + projector : ''}</td>
                  <td>{days}</td>
                  <td>{price}</td>
                  <td>{dayjs(createdAt).format('D.MM.YYYY')}</td> 
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Profile;
