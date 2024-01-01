import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManagePatient from './components/ManagePatient';
import AddMedicine from './components/AddMedicine';
import ManageMedicine from './components/ManageMedicine';
import AddInvoice from './components/AddInvoice';
import ManageInvoice from './components/ManageInvoice';
import Dashboard from './components/Dashboard';
import SideNav from './components/SideNav';
import AddPatient from './components/AddPatient';


function App() {
  return (
    <Router>
      <div>
        <SideNav />
        
     
        <Routes>
         
          <Route path="/add" element={<AddPatient />} />
          <Route path="/manage" element={<ManagePatient />} />
          <Route path="/add_medicine" element={<AddMedicine />} />
          <Route path="/manage_medicine" element={<ManageMedicine />} />
          <Route path="/add_invoice" element={<AddInvoice />} />
          <Route path="/manage_invoice" element={<ManageInvoice />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/manage"
            element={<ManagePatient />}
          />
          <Route
            path="/manage_medicine"
            element={<ManageMedicine />}
          />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
