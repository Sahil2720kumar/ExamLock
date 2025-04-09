export function convertTo12Hour(time24: string) {
  if (!time24) return '';

  // Parse the time string (assuming format is "HH:MM:SS")
  const [hours, minutes, seconds] = time24?.split(':').map(Number);
  
  // Determine if it's AM or PM
  const period = hours >= 12 ? 'pm' : 'am';
  
  // Convert to 12-hour format (12 remains 12, not 0)
  const hours12 = hours % 12 || 12;
  
  // Format minutes with leading zeros if needed
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  // Return formatted string with hours and minutes
  return `${hours12}:${formattedMinutes} ${period}`;
}
