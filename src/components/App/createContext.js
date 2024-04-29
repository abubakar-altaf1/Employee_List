import { createContext, useReducer } from 'react';
import axios from 'axios';


const initailState = {
  employeesData: [],
  // response: null
};

const AppContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, employeesData: action.payload };
    case 'ADD_USER':
      return { ...state, employeesData: [state.employeesData, action.payload] };

    case 'DELETE_USER':
      const filterData = state.employeesData.filter(
        (employee) => employee.id !== action.payload
      );
      return { ...state, employeesData: filterData };
    case "SINGLE_USER":
      return { ...state, employeesData: action.payload };
    // case 'UPDATE_USER':
    //   // Update the singleEmployee data in the state
    //   return { ...state, response: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, distpatch] = useReducer(AppReducer, initailState);

  const FetchAllUser = async () => {
    try {
      const res = await axios.get('http://localhost:7000/employeesData');
      distpatch({ type: 'GET_USERS', payload: res.data });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const AddNewEmployee = async (newEmployee) => {
    const res = await axios.post('http://localhost:7000/employeesData', newEmployee);

    distpatch({ type: 'ADD_USER', payload: res.data });
  };

  const DELETEUser = async (id) => {
    axios.delete(`http://localhost:7000/employeesData/${id}`);
    distpatch({ type: 'DELETE_USER', payload: id });
  };

  const SingleUser = async (id) => {
    // console.log(id, "sir id");
    const res = await axios.get(`http://localhost:7000/employeesData/${id}`);
    distpatch({ type: "SINGLE_USER", payload: res.data });
  };
  // const UpdateUser = async (id, user) => {
  //   // console.log(id, "sir id");
  //   const res = await axios.put(
  //     `http://localhost:7000/employeesData/${id}`,
  //     user
  //   );
  //   console.log(res.data);


  // }
  const UpdateUser = async (id, updatedUser) => {
    try {
      const res = await axios.put(
        `http://localhost:7000/employeesData/${id}`,
        updatedUser
      );

      // if (res.statusCode === 200) {
      //   distpatch({ type: 'UPDATE_USER', payload: "success" });

      // }
      // You can dispatch an action to update the state if needed

      // Log the updated data
      console.log('User updated:', res);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{ state, FetchAllUser, DELETEUser, AddNewEmployee, SingleUser, UpdateUser }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export { AppContext, AppProvider };
