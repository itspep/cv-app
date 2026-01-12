import React from 'react';
import { formatDate, formatDateRange } from '../../utils/formatDate';
import './Preview.css';

const Preview = ({ cvData }) => {
  const { personalInfo, education, experience, skills } = cvData;

  const getProficiencyText = (level) => {
    if (level >= 80) return 'Expert';
    if (level >= 60) return 'Advanced';
    if (level >= 40) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="cv-preview" id="cv-preview">
      {/* Header */}
      <header className="cv-header">
        <div className="cv-name">
          <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
          {personalInfo.summary && (
            <p className="cv-summary">{personalInfo.summary}</p>
          )}
        </div>
        
        <div className="cv-contact">
          {personalInfo.email && (
            <div className="contact-item">
              <strong>Email:</strong> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="contact-item">
              <strong>Phone:</strong> {personalInfo.phone}
            </div>
          )}
          {personalInfo.address && (
            <div className="contact-item">
              <strong>Address:</strong> {personalInfo.address}
            </div>
          )}
          {personalInfo.website && (
            <div className="contact-item">
              <strong>Website:</strong> {personalInfo.website}
            </div>
          )}
        </div>
      </header>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="cv-section">
          <h2 className="section-title">
            <span className="section-icon">💼</span>
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="section-item">
              <div className="item-header">
                <div className="item-title">
                  <h3>{exp.position}</h3>
                  <p className="item-subtitle">{exp.company}</p>
                </div>
                <div className="item-date">
                  {formatDateRange(exp.startDate, exp.endDate)}
                </div>
              </div>
              {exp.description && (
                <p className="item-description">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="cv-section">
          <h2 className="section-title">
            <span className="section-icon">🎓</span>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="section-item">
              <div className="item-header">
                <div className="item-title">
                  <h3>{edu.degree}</h3>
                  <p className="item-subtitle">{edu.school}</p>
                </div>
                <div className="item-date">
                  {formatDateRange(edu.startDate, edu.endDate)}
                </div>
              </div>
              {edu.description && (
                <p className="item-description">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="cv-section">
          <h2 className="section-title">
            <span className="section-icon">🛠️</span>
            Skills
          </h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-level">
                  <div className="skill-level-bar">
                    <div 
                      className="skill-level-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="skill-level-text">
                    {getProficiencyText(skill.level)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Preview;
