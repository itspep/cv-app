export const formatDate = (dateString) => {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString + '-01');
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const formatDateRange = (start, end) => {
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);
  return `${startFormatted} - ${endFormatted}`;
};
