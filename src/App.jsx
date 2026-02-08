import React, { useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description of the project' },
    { id: 2, title: 'Project 2', description: 'Description of the project' },
    { id: 3, title: 'Project 3', description: 'Description of the project' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const addProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>Personal Project App</h1>
      </header>

      <section className="card-section">
        <h3>Add Project</h3>
        <ProjectForm onAdd={addProject} />
      </section>

      <section className="card-section">
        <input 
          type="text" 
          placeholder="Search Projects" 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="project-list">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-item">
              <div className="img-placeholder">✕</div>
              <div className="project-info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const ProjectForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc) return;
    onAdd({ title, description: desc });
    setTitle("");
    setDesc("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-layout">
      <label>Title</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      
      <label>Description</label>
      <textarea 
        rows="3" 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
      />
      
      <button type="submit" className="btn-add">Add</button>
    </form>
  );
};

export default App;