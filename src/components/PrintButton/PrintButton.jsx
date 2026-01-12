import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './PrintButton.css';

const PrintButton = ({ cvData }) => {
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV`,
    pageStyle: `
      @page {
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        .cv-preview {
          padding: 0;
          font-size: 12pt;
        }
      }
    `
  });

  const handleDownloadPDF = () => {
    alert('PDF download would require additional libraries like jsPDF or html2canvas. For now, use Print and save as PDF.');
    handlePrint();
  };

  return (
    <div className="print-button-container">
      {/* Hidden component for printing */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <div className="cv-preview-print">
            {/* Header */}
            <header className="cv-header-print">
              <div className="cv-name-print">
                <h1>{cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</h1>
                {cvData.personalInfo.summary && (
                  <p className="cv-summary-print">{cvData.personalInfo.summary}</p>
                )}
              </div>
              
              <div className="cv-contact-print">
                {cvData.personalInfo.email && (
                  <div><strong>Email:</strong> {cvData.personalInfo.email}</div>
                )}
                {cvData.personalInfo.phone && (
                  <div><strong>Phone:</strong> {cvData.personalInfo.phone}</div>
                )}
                {cvData.personalInfo.address && (
                  <div><strong>Address:</strong> {cvData.personalInfo.address}</div>
                )}
                {cvData.personalInfo.website && (
                  <div><strong>Website:</strong> {cvData.personalInfo.website}</div>
                )}
              </div>
            </header>

            {/* Content sections will be printed from the preview */}
          </div>
        </div>
      </div>

      <div className="button-group">
        <button 
          onClick={handlePrint}
          className="print-btn"
          title="Print CV"
        >
          🖨️ Print CV
        </button>
        
        <button 
          onClick={handleDownloadPDF}
          className="pdf-btn"
          title="Download as PDF"
        >
          📥 Download PDF
        </button>
        
        <button 
          onClick={() => {
            const cvText = generateCVText(cvData);
            navigator.clipboard.writeText(cvText)
              .then(() => alert('CV copied to clipboard!'))
              .catch(err => console.error('Failed to copy:', err));
          }}
          className="copy-btn"
          title="Copy as Text"
        >
          📋 Copy Text
        </button>
      </div>
      
      <p className="print-tip">
        Tip: Use "Save as PDF" in print dialog for best results
      </p>
    </div>
  );
};

// Helper function to generate plain text version
const generateCVText = (cvData) => {
  const { personalInfo, education, experience, skills } = cvData;
  
  let text = `CV - ${personalInfo.firstName} ${personalInfo.lastName}\n`;
  text += '='.repeat(50) + '\n\n';
  
  // Contact Info
  text += 'CONTACT INFORMATION\n';
  text += '-' .repeat(20) + '\n';
  if (personalInfo.email) text += `Email: ${personalInfo.email}\n`;
  if (personalInfo.phone) text += `Phone: ${personalInfo.phone}\n`;
  if (personalInfo.address) text += `Address: ${personalInfo.address}\n`;
  if (personalInfo.website) text += `Website: ${personalInfo.website}\n`;
  if (personalInfo.summary) text += `\nSummary: ${personalInfo.summary}\n`;
  text += '\n';
  
  // Experience
  if (experience.length > 0) {
    text += 'PROFESSIONAL EXPERIENCE\n';
    text += '-' .repeat(25) + '\n';
    experience.forEach(exp => {
      text += `${exp.position} at ${exp.company}\n`;
      if (exp.startDate || exp.endDate) {
        text += `Period: ${exp.startDate || ''} - ${exp.endDate || 'Present'}\n`;
      }
      if (exp.description) text += `${exp.description}\n`;
      text += '\n';
    });
  }
  
  // Education
  if (education.length > 0) {
    text += 'EDUCATION\n';
    text += '-' .repeat(10) + '\n';
    education.forEach(edu => {
      text += `${edu.degree}\n`;
      text += `${edu.school}\n`;
      if (edu.startDate || edu.endDate) {
        text += `Period: ${edu.startDate || ''} - ${edu.endDate || 'Present'}\n`;
      }
      if (edu.description) text += `${edu.description}\n`;
      text += '\n';
    });
  }
  
  // Skills
  if (skills.length > 0) {
    text += 'SKILLS\n';
    text += '-' .repeat(6) + '\n';
    skills.forEach(skill => {
      text += `• ${skill.name}\n`;
    });
  }
  
  return text;
};

export default PrintButton;
