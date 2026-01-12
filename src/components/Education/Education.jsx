import React, { useState } from 'react';
import './Education.css';

const Education = ({ education, onAdd, onUpdate, onRemove }) => {
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrent: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEducation(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      onAdd({
        id: Date.now(),
        ...newEducation,
        endDate: newEducation.isCurrent ? 'Present' : newEducation.endDate
      });
      setNewEducation({
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrent: false
      });
    }
  };

  const handleUpdate = (index, field, value) => {
    onUpdate(index, { [field]: value });
  };

  const handleCurrentChange = (index, checked) => {
    if (checked) {
      onUpdate(index, { endDate: 'Present' });
    } else {
      onUpdate(index, { endDate: '' });
    }
  };

  return (
    <div className="education">
      {/* Existing Education Items */}
      {education.map((edu, index) => (
        <div key={edu.id} className="education-item">
          <div className="item-header">
            <h3 className="item-title">{edu.school}</h3>
            <button 
              className="remove-btn"
              onClick={() => onRemove(index)}
            >
              Remove
            </button>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>School/University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleUpdate(index, 'school', e.target.value)}
                placeholder="Stanford University"
              />
            </div>
            
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={edu.startDate || ''}
                onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <div className="date-input-group">
                <input
                  type="month"
                  value={edu.endDate === 'Present' ? '' : edu.endDate}
                  onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                  placeholder={edu.endDate === 'Present' ? 'Present' : 'YYYY-MM'}
                  disabled={edu.endDate === 'Present'}
                />
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id={`edu-current-${index}`}
                    checked={edu.endDate === 'Present'}
                    onChange={(e) => handleCurrentChange(index, e.target.checked)}
                  />
                  <label htmlFor={`edu-current-${index}`}>Currently studying</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={edu.description}
              onChange={(e) => handleUpdate(index, 'description', e.target.value)}
              placeholder="Describe your education, achievements, relevant coursework..."
              rows="3"
            />
          </div>
        </div>
      ))}

      {/* Add New Education Form */}
      <div className="add-education-form">
        <h3>Add New Education</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>School/University *</label>
            <input
              type="text"
              name="school"
              value={newEducation.school}
              onChange={handleInputChange}
              placeholder="Stanford University"
            />
          </div>
          
          <div className="form-group">
            <label>Degree *</label>
            <input
              type="text"
              name="degree"
              value={newEducation.degree}
              onChange={handleInputChange}
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="month"
              name="startDate"
              value={newEducation.startDate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>End Date</label>
            <div className="date-input-group">
              <input
                type="month"
                name="endDate"
                value={newEducation.isCurrent ? '' : newEducation.endDate}
                onChange={handleInputChange}
                placeholder={newEducation.isCurrent ? 'Present' : 'YYYY-MM'}
                disabled={newEducation.isCurrent}
              />
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="new-edu-current"
                  name="isCurrent"
                  checked={newEducation.isCurrent}
                  onChange={handleInputChange}
                />
                <label htmlFor="new-edu-current">Currently studying</label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newEducation.description}
            onChange={handleInputChange}
            placeholder="Describe your education, achievements, relevant coursework..."
            rows="3"
          />
        </div>

        <button 
          className="add-btn"
          onClick={handleAdd}
          disabled={!newEducation.school || !newEducation.degree}
        >
          Add Education
        </button>
      </div>
    </div>
  );
};

export default Education;
