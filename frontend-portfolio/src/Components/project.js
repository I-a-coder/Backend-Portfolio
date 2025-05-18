import React, { useEffect, useState } from 'react';
import API from '../api';

function Projects() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', technologies: '',
    githubLink: '', liveLink: '', startDate: '', endDate: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await API.get('/api/projects');
    setList(res.data);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, technologies: form.technologies.split(',').map(t => t.trim()) };
    if (editId) {
      await API.put(`/api/projects/${editId}`, data);
    } else {
      await API.post('/api/projects', data);
    }
    fetchData();
    setForm({ title: '', description: '', technologies: '', githubLink: '', liveLink: '', startDate: '', endDate: '' });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      technologies: item.technologies.join(', '),
      githubLink: item.githubLink,
      liveLink: item.liveLink,
      startDate: item.startDate?.substring(0, 10),
      endDate: item.endDate?.substring(0, 10)
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/projects/${id}`);
    fetchData();
  };

  return (
    <div className="section">
      <h2>{editId ? 'Edit' : 'Add'} Project</h2>
      <form onSubmit={handleSubmit}>
        {['title', 'description', 'technologies', 'githubLink', 'liveLink', 'startDate', 'endDate'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required={field === 'title' || field === 'description'}
          />
        ))}
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            <b>{item.title}</b><br />
            {item.description}<br />
            Tech: {item.technologies.join(', ')}<br />
            <a href={item.githubLink} target="_blank" rel="noreferrer">GitHub</a> | 
            <a href={item.liveLink} target="_blank" rel="noreferrer"> Live</a><br />
            {item.startDate?.substring(0, 10)} → {item.endDate?.substring(0, 10)}<br />
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
