import React, { useEffect, useState } from 'react';
import API from '../api';

function Education() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    school: '', degree: '', fieldOfStudy: '',
    startDate: '', endDate: '', grade: '', description: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await API.get('/api/education');
    setList(res.data);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/api/education/${editId}`, form);
    } else {
      await API.post('/api/education', form);
    }
    fetchData();
    setForm({ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '', description: '' });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setForm({
      school: item.school, degree: item.degree, fieldOfStudy: item.fieldOfStudy,
      startDate: item.startDate?.substring(0, 10), endDate: item.endDate?.substring(0, 10),
      grade: item.grade, description: item.description
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/education/${id}`);
    fetchData();
  };

  return (
    <div className="section">
      <h2>{editId ? 'Edit' : 'Add'} Education</h2>
      <form onSubmit={handleSubmit}>
        {['school', 'degree', 'fieldOfStudy', 'startDate', 'endDate', 'grade', 'description'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required={['school', 'degree', 'fieldOfStudy', 'startDate'].includes(field)}
          />
        ))}
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            <b>{item.degree}</b> at {item.school}<br />
            {item.fieldOfStudy}, Grade: {item.grade}<br />
            {item.startDate?.substring(0, 10)} to {item.endDate?.substring(0, 10)}<br />
            {item.description}<br />
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Education;
