import React from 'react';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { Route, Routes } from 'react-router-dom';

const Dashboard = () => {
  
  return (
    <div className="container">
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/" element={<Table />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
