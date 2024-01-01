import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="heading-container">
        <h1>Welcome to the Dashboard</h1>
        <div className="boxes-container">
          <Link to="/manage" className="box">
            <h2>3 Total Customers</h2>
          </Link>
          <Link to="/manage_medicine" className="box">
            <h2>3 Expired Medicine</h2>
          </Link>
        </div>
      </div>
      <div className="boxes-container">
        <Link to="/manage_medicine" className="box">
          <h2>3 Total Medicine</h2>
        </Link>
        <Link to="/manage_medicine" className="box">
          <h2>3 Out Of Stock</h2>
        </Link>
        <Link to="/manage_invoice" className="box">
        <h2>3 Total Invoices</h2>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

