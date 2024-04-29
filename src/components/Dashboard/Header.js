import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  return (
    <header>
      <h1>Employee Management Software</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => navigate('/add')}>Add Employee</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
