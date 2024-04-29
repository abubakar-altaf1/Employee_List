import React, { useContext, useEffect, useLayoutEffect } from 'react';
// import { employeesData } from '../../data';
import Header from './Header';
import Swal from 'sweetalert2';
import { AppContext } from '../App/createContext';
import { useNavigate } from 'react-router-dom';


const Table = () => {
  const { state, FetchAllUser, DELETEUser } = useContext(AppContext);
  const navigate = useNavigate()



  useEffect(() => {
    FetchAllUser();
    console.log(`rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr`);
  }, []);

  console.log(state);


  const handleDelete = (id) => {
    // console.log(id, "id");
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      DELETEUser(id); 
      if (result.value) {
        console.log(result, 'result');
        //delte api call
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        FetchAllUser();
      }
    });
  };

  return (
    <div className="contain-table">
      <Header />
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {state.employeesData
            .length > 0 ? (
            state.employeesData.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.date} </td>
                <td className="text-right">

                  <button onClick={() => {
                    navigate(`/edit/${employee.id}`)
                  }} className="button muted-button">
                    Edit
                  </button>

                </td>
                <td className="text-left">
                  <button
                    onClick={() => {
                      handleDelete(employee.id);
                    }}
                    className="button muted-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
