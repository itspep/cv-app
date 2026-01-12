import React from 'react';
import './PrintButton.css';

const PrintButton = ({ cvData = {} }) => {
  // Simple direct print
  const handlePrint = () => {
    // Store original body content
    const originalBody = document.body.innerHTML;
    
    // Get the CV preview
    const cvContent = document.getElementById('cv-preview');
    
    if (!cvContent) {
      alert('Cannot find CV content');
      return;
    }
    
    // Replace body with CV content only
    document.body.innerHTML = cvContent.outerHTML;
    
    // Add print styles
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page {
          margin: 15mm;
        }
        body {
          font-size: 12pt;
          line-height: 1.5;
        }
      }
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
    `;
    document.head.appendChild(style);
    
    // Trigger print
    window.print();
    
    // Restore original content
    document.body.innerHTML = originalBody;
    
    // Force page reload to restore React
    window.location.reload();
  };

  const handleSavePDF = () => {
    // Just use print dialog - user can select "Save as PDF"
    handlePrint();
  };

  const handleCopyText = () => {
    const safeCvData = {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        summary: '',
        ...cvData?.personalInfo
      },
      education: cvData?.education || [],
      experience: cvData?.experience || [],
      skills: cvData?.skills || []
    };

    const { personalInfo, education, experience, skills } = safeCvData;
    
    let text = `CV - ${personalInfo.firstName} ${personalInfo.lastName}\n`;
    text += '='.repeat(50) + '\n\n';
    
    if (personalInfo.email) text += `Email: ${personalInfo.email}\n`;
    if (personalInfo.phone) text += `Phone: ${personalInfo.phone}\n`;
    if (personalInfo.address) text += `Address: ${personalInfo.address}\n`;
    if (personalInfo.website) text += `Website: ${personalInfo.website}\n`;
    if (personalInfo.summary) text += `\n${personalInfo.summary}\n\n`;
    
    if (experience.length > 0) {
      text += 'EXPERIENCE:\n';
      experience.forEach(exp => {
        text += `${exp.position || ''} at ${exp.company || ''}\n`;
        text += `${exp.startDate || ''} - ${exp.endDate || 'Present'}\n`;
        if (exp.description) text += `${exp.description}\n\n`;
      });
    }
    
    if (education.length > 0) {
      text += 'EDUCATION:\n';
      education.forEach(edu => {
        text += `${edu.degree || ''}\n`;
        text += `${edu.school || ''}\n`;
        text += `${edu.startDate || ''} - ${edu.endDate || 'Present'}\n`;
        if (edu.description) text += `${edu.description}\n\n`;
      });
    }
    
    if (skills.length > 0) {
      text += 'SKILLS:\n';
      skills.forEach(skill => {
        text += `• ${skill.name || ''} (${skill.level || 0}%)\n`;
      });
    }
    
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => alert('✅ CV copied to clipboard!'))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      alert('✅ CV copied to clipboard!');
    } catch (err) {
      alert('❌ Failed to copy. Please select and copy manually.');
      console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <div className="print-button-container">
      <div className="button-group">
        <button onClick={handlePrint} className="print-btn">
          🖨️ Print CV
        </button>
        <button onClick={handleSavePDF} className="pdf-btn">
          📥 Save as PDF
        </button>
        <button onClick={handleCopyText} className="copy-btn">
          📋 Copy Text
        </button>
      </div>
      <p className="print-tip">
        For PDF: Click Print, then choose "Save as PDF" in the print dialog
      </p>
    </div>
  );
};

export default PrintButton;
