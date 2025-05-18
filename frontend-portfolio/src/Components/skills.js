import React, { useEffect, useState } from 'react';
import API from '../api';

function Skills() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', level: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await API.get('/api/skills');
    setList(res.data);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/api/skills/${editId}`, form);
    } else {
      await API.post('/api/skills', form);
    }
    fetchData();
    setForm({ name: '', level: '' });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, level: item.level });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/skills/${id}`);
    fetchData();
  };

  return (
    <div className="section">
      <h2>{editId ? 'Edit' : 'Add'} Skill</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Skill Name" required />
        <input name="level" value={form.level} onChange={handleChange} placeholder="Level (Beginner/Advanced)" required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            <b>{item.name}</b> - {item.level}
            <br />
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
