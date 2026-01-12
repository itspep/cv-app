import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import Education from './components/Education/Education';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Preview from './components/Preview/Preview';
import PrintButton from './components/PrintButton/PrintButton';
import { initialCV } from './utils/initialData';

function App() {
  const [cvData, setCvData] = useState(() => {
    // Try to load from localStorage first
    const savedCV = localStorage.getItem('cvData');
    return savedCV ? JSON.parse(savedCV) : initialCV;
  });

  // Save to localStorage whenever cvData changes
  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  const updatePersonalInfo = (data) => {
    setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, ...data } });
  };

  const addEducation = (education) => {
    setCvData({
      ...cvData,
      education: [...cvData.education, education]
    });
  };

  const updateEducation = (index, data) => {
    const updatedEducation = [...cvData.education];
    updatedEducation[index] = { ...updatedEducation[index], ...data };
    setCvData({ ...cvData, education: updatedEducation });
  };

  const removeEducation = (index) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter((_, i) => i !== index)
    });
  };

  const addExperience = (experience) => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, experience]
    });
  };

  const updateExperience = (index, data) => {
    const updatedExperience = [...cvData.experience];
    updatedExperience[index] = { ...updatedExperience[index], ...data };
    setCvData({ ...cvData, experience: updatedExperience });
  };

  const removeExperience = (index) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((_, i) => i !== index)
    });
  };

  const addSkill = (skill) => {
    setCvData({
      ...cvData,
      skills: [...cvData.skills, skill]
    });
  };

  const removeSkill = (index) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.filter((_, i) => i !== index)
    });
  };

  const loadExample = () => {
    setCvData(initialCV);
  };

  const resetCV = () => {
    setCvData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        summary: ''
      },
      education: [],
      experience: [],
      skills: []
    });
  };

  return (
    <div className="app">
      <Header />
      
      <div className="app-container">
        <div className="input-section">
          <div className="section-card">
            <h2>Personal Information</h2>
            <PersonalInfo 
              data={cvData.personalInfo}
              onChange={updatePersonalInfo}
            />
          </div>

          <div className="section-card">
            <h2>Education</h2>
            <Education 
              education={cvData.education}
              onAdd={addEducation}
              onUpdate={updateEducation}
              onRemove={removeEducation}
            />
          </div>

          <div className="section-card">
            <h2>Experience</h2>
            <Experience 
              experience={cvData.experience}
              onAdd={addExperience}
              onUpdate={updateExperience}
              onRemove={removeExperience}
            />
          </div>

          <div className="section-card">
            <h2>Skills</h2>
            <Skills 
              skills={cvData.skills}
              onAdd={addSkill}
              onRemove={removeSkill}
            />
          </div>

          <div className="action-buttons">
            <button onClick={loadExample} className="btn btn-example">
              Load Example CV
            </button>
            <button onClick={resetCV} className="btn btn-reset">
              Reset All
            </button>
          </div>
        </div>

        <div className="preview-section">
          <div className="preview-header">
            <h2>CV Preview</h2>
            <PrintButton cvData={cvData} />
          </div>
          <Preview cvData={cvData} />
        </div>
      </div>
    </div>
  );
}

export default App;
