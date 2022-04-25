import "./Profile.scss";
import moment from 'moment'
import ps4Controller2 from "../assets/ps4/ps4-2.png";
import ps4Controller4 from "../assets/ps4/ps4-4.png";
import ps5Controller2 from "../assets/ps5//console_5-2.png";
import ps5Controller4 from "../assets/ps5//console_5-4.png";
import { FaUserEdit } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";

// TODO sort, use img alt as text (ps5 or ps4)

const Profile = () => {
  const {
    // isLoading,
    _id,
    createdAt,
    console,
    days,
    controllers,
    projector,
    rentLocation,
    price,
    rents,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')

  const handleSearch = (e) => {
    // if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <div>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />
          <button
            className='btn btn-block btn-danger'
            // disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
      <table>
        <thead>
          {/* <tr>
            <th>Sortiraj</th>
            <th><Link to="#"><FaUserEdit /></Link></th>
          </tr> */}
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
              return (
                <td key={_id}>
                
                </td>
              )
        })}
            {/* <tr>
              <td>
                <img src={ps5Controller2}></img>
                + projektor {"2 dana"}      
              </td>
              <td>1</td>
              <td>2000</td>
              <td>01.04.2022.</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Profile;
