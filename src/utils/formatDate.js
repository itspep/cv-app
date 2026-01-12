export const formatDate = (dateString) => {
  if (!dateString || dateString === 'Present') return 'Present';
  
  try {
    const date = new Date(dateString + '-01');
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch (error) {
    return dateString;
  }
};

export const formatDateRange = (start, end) => {
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);
  
  if (startFormatted === 'Present' && endFormatted === 'Present') {
    return 'Present';
  }
  
  return `${startFormatted} - ${endFormatted}`;
};
