import React, { useEffect, useState } from 'react';
import API from '../api';

function Experience() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    company: '', position: '', location: '',
    startDate: '', endDate: '', description: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await API.get('/api/experience');
    setList(res.data);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/api/experience/${editId}`, form);
    } else {
      await API.post('/api/experience', form);
    }
    fetchData();
    setForm({ company: '', position: '', location: '', startDate: '', endDate: '', description: '' });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setForm({
      company: item.company,
      position: item.position,
      location: item.location,
      startDate: item.startDate?.substring(0, 10),
      endDate: item.endDate?.substring(0, 10),
      description: item.description
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/experience/${id}`);
    fetchData();
  };

  return (
    <div className="section">
      <h2>{editId ? 'Edit' : 'Add'} Experience</h2>
      <form onSubmit={handleSubmit}>
        {['company', 'position', 'location', 'startDate', 'endDate', 'description'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required={['company', 'position', 'startDate'].includes(field)}
          />
        ))}
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            <b>{item.position}</b> at {item.company}<br />
            {item.location} <br />
            {item.description}<br />
            {item.startDate?.substring(0, 10)} → {item.endDate?.substring(0, 10)}<br />
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Experience;
