import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageMedicine.css';

export default function ManageMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMedicine, setEditingMedicine] = useState(null);

  useEffect(() => {
    function getMedicines() {
      axios.get('http://localhost:8070/medicine/')
        .then(res => {
          setMedicines(res.data);
        })
        .catch(err => {
          alert(err.message);
        });
    }

    getMedicines();
  }, []);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(medicine.date).toLocaleDateString().includes(searchTerm) ||
    medicine.packing.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.mrp.toString().includes(searchTerm)
  );

  const handleEdit = medicine => {
    setEditingMedicine(medicine);
  };

  const handleDelete = medicine => {
    axios.delete(`http://localhost:8070/medicine/delete/${medicine._id}`)
      .then((res) => {
        alert(res.data.status);
        setMedicines(medicines.filter(i=> i._id !== medicine._id));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8070/medicine/update/${editingMedicine._id}`, editingMedicine)
      .then(res => {
        alert(res.data.status);
        setEditingMedicine(null);
        setMedicines(medicines.map(medicine => {
          if (medicine._id === editingMedicine._id) {
            return editingMedicine;
          } else {
            return medicine;
          }
        }));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditingMedicine(null);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditingMedicine(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Manage Medicines</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Packing</th>
            <th>Expiry Date</th>
            <th>MRP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.map((medicine) => (
            <tr key={medicine._id}>
              <td> {editingMedicine?._id === medicine._id ? (
                <input type="text" value={editingMedicine?.medicineName} onChange={e => handleChange(e, 'medicineName')} />
                ) : (
                  medicine.medicineName
                )}
              </td>
              <td>
                {editingMedicine?._id === medicine._id ? (
                  <input type="text" value={editingMedicine?.packing} onChange={e => handleChange(e, 'packing')} />
                  ) : (
                  medicine.packing
                  )}
                  </td>
                  <td>
                  {editingMedicine?._id === medicine._id ? (
                  <input type="date" value={editingMedicine?.date} onChange={e => handleChange(e, 'date')} />
                  ) : (
                  new Date(medicine.date).toLocaleDateString()
                  )}
                  </td>
                  <td>
                  {editingMedicine?._id === medicine._id ? (
                  <input type="text" value={editingMedicine?.mrp} onChange={e => handleChange(e, 'mrp')} />
                  ) : (
                  medicine.mrp
                  )}
                  </td>
                  <td>
                  {editingMedicine?._id === medicine._id ? (
                  <>
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                  ) : (
                  <>
                  <button onClick={() => handleEdit(medicine)}>Edit</button>
                  <button onClick={() => handleDelete(medicine)}>Delete</button>
                  </>
                  )}
                  </td>
                  </tr>
                  ))}
                  </tbody>
                  </table>
                  </div>
                  );
                  }




            