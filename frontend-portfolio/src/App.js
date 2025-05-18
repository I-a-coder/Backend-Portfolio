import React, { useState } from 'react';
import Education from './Components/Education';
import Skills from './Components/skills';
import Projects from './Components/project';
import Experience from './Components/experince';

import './App.css'; // for basic styling

function App() {
  const [tab, setTab] = useState('education');

  const renderSection = () => {
    switch (tab) {
      case 'education':
        return <Education />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'experience':
        return <Experience />;
      default:
        return <Education />;
    }
  };

  return (
    <div className="container">
      <h1>Portfolio Manager</h1>
      <div className="tab-bar">
        <button onClick={() => setTab('education')} className={tab === 'education' ? 'active' : ''}>Education</button>
        <button onClick={() => setTab('skills')} className={tab === 'skills' ? 'active' : ''}>Skills</button>
        <button onClick={() => setTab('projects')} className={tab === 'projects' ? 'active' : ''}>Projects</button>
        <button onClick={() => setTab('experience')} className={tab === 'experience' ? 'active' : ''}>Experience</button>
      </div>
      <div className="content">{renderSection()}</div>
    </div>
  );
}

export default App;
