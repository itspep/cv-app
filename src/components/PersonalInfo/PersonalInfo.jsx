import React from 'react';
import './PersonalInfo.css';

const PersonalInfo = ({ data, onChange }) => {
  // Ensure data is never undefined
  const safeData = data || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    summary: ''
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onChange) {
      onChange({ [name]: value });
    }
  };

  return (
    <div className="personal-info">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={safeData.firstName || ''}
            onChange={handleChange}
            placeholder="John"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={safeData.lastName || ''}
            onChange={handleChange}
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={safeData.email || ''}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={safeData.phone || ''}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={safeData.address || ''}
          onChange={handleChange}
          placeholder="123 Main Street, City, Country"
        />
      </div>

      <div className="form-group">
        <label htmlFor="website">Website/Portfolio</label>
        <input
          type="url"
          id="website"
          name="website"
          value={safeData.website || ''}
          onChange={handleChange}
          placeholder="yourportfolio.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="summary">Professional Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={safeData.summary || ''}
          onChange={handleChange}
          placeholder="Briefly describe your professional background, skills, and career objectives..."
          rows="4"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
