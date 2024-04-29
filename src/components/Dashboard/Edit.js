import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../App/createContext';
const Edit = () => {
  const navigate = useNavigate()
  const { SingleUser, state, UpdateUser, } = useContext(AppContext)
  // console.log(state , 'sssssssssss');
  const { id } = useParams()
  // console.log(id,"eidt id");
  React.useEffect(() => {
    setUpdateData(state.employeesData)
  }, [state.employeesData])
  React.useEffect(() => {
    SingleUser(id)
    // console.log('run useEffecy');
  }, [id])
  // const initialState={
  //   firstName:state.employeesData.firstName,
  //   lastName:"",
  //   email:"",
  //   date:"",
  //   salary:""
  // }
  const [updateData, setUpdateData] = useState({});
  // console.log(updateData, 'local state', );
  function handleChange(e) {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  }
  const { firstName, lastName, email, salary, date } = updateData
  // console.log(state , 'single data');


  // console.log(state.response);
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
    UpdateUser(id, updateData)
    // Update api Call
    // uopdate(id , updateData)
    //  if(state.response === 'success'){
    //   navigate('/')
    //  }

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={handleChange}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Home Page"
            onClick={() => { navigate('/') }}
          />
        </div>
      </form>
    </div>
  );
};
export default Edit;