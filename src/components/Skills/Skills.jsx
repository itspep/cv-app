import React, { useState } from 'react';
import './Skills.css';

const Skills = ({ skills, onAdd, onRemove }) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [skillLevel, setSkillLevel] = useState(50);

  const handleAdd = () => {
    if (newSkill.name.trim()) {
      onAdd({
        id: Date.now(),
        name: newSkill.name.trim(),
        level: skillLevel
      });
      setNewSkill({ name: '', level: 50 });
      setSkillLevel(50);
    }
  };

  const getProficiencyText = (level) => {
    if (level >= 80) return 'Expert';
    if (level >= 60) return 'Advanced';
    if (level >= 40) return 'Intermediate';
    return 'Beginner';
  };

  const getProficiencyColor = (level) => {
    if (level >= 80) return '#27ae60'; // Green
    if (level >= 60) return '#f39c12'; // Orange
    if (level >= 40) return '#3498db'; // Blue
    return '#e74c3c'; // Red
  };

  return (
    <div className="skills">
      {/* Skills List */}
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={skill.id} className="skill-item">
            <div className="skill-header">
              <div className="skill-name">{skill.name}</div>
              <button 
                className="remove-btn"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            </div>
            
            <div className="skill-proficiency">
              <div className="skill-level-bar">
                <div 
                  className="skill-level-fill"
                  style={{ 
                    width: `${skill.level}%`,
                    backgroundColor: getProficiencyColor(skill.level)
                  }}
                />
              </div>
              <div className="skill-level-info">
                <span className="skill-level-text">
                  {getProficiencyText(skill.level)} ({skill.level}%)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Form */}
      <div className="add-skill-form">
        <h3>Add New Skill</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Skill Name *</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="JavaScript, React, Project Management..."
            />
          </div>
        </div>

        <div className="form-group">
          <label>Proficiency Level: {getProficiencyText(skillLevel)} ({skillLevel}%)</label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={skillLevel}
            onChange={(e) => setSkillLevel(parseInt(e.target.value))}
            className="skill-slider"
            style={{
              background: `linear-gradient(to right, #e74c3c 0%, #f39c12 40%, #3498db 60%, #27ae60 100%)`
            }}
          />
          <div className="skill-level-labels">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
            <span>Expert</span>
          </div>
        </div>

        <button 
          className="add-btn"
          onClick={handleAdd}
          disabled={!newSkill.name.trim()}
        >
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default Skills;
