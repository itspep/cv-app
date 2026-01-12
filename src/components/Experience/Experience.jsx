import React, { useState } from 'react';
import './Experience.css';

const Experience = ({ experience, onAdd, onUpdate, onRemove }) => {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (newExperience.company && newExperience.position) {
      onAdd({
        id: Date.now(),
        ...newExperience
      });
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      });
    }
  };

  const handleUpdate = (index, field, value) => {
    onUpdate(index, { [field]: value });
  };

  return (
    <div className="experience">
      {/* Existing Experience Items */}
      {experience.map((exp, index) => (
        <div key={exp.id} className="experience-item">
          <div className="item-header">
            <h3 className="item-title">{exp.company}</h3>
            <button 
              className="remove-btn"
              onClick={() => onRemove(index)}
            >
              Remove
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                placeholder="Google"
              />
            </div>
            
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleUpdate(index, 'position', e.target.value)}
                placeholder="Senior Software Engineer"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>End Date (or Present)</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                placeholder="Present"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleUpdate(index, 'description', e.target.value)}
              placeholder="Describe your responsibilities, achievements, and technologies used..."
              rows="4"
            />
          </div>
        </div>
      ))}

      {/* Add New Experience Form */}
      <div className="add-experience-form">
        <h3>Add New Experience</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={newExperience.company}
              onChange={handleInputChange}
              placeholder="Google"
            />
          </div>
          
          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              name="position"
              value={newExperience.position}
              onChange={handleInputChange}
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="month"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>End Date (or Present)</label>
            <input
              type="month"
              name="endDate"
              value={newExperience.endDate}
              onChange={handleInputChange}
              placeholder="Leave empty for 'Present'"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newExperience.description}
            onChange={handleInputChange}
            placeholder="Describe your responsibilities, achievements, and technologies used..."
            rows="4"
          />
        </div>

        <button 
          className="add-btn"
          onClick={handleAdd}
          disabled={!newExperience.company || !newExperience.position}
        >
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default Experience;
