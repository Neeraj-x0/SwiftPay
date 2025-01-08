function parseDate(date1: string, date2: string | null = null) {
  // Helper function to format month and day
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to format full date with year
  const formatDateWithYear = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Parse the date strings
  const parsedDate1 = new Date(date1); // Assumes `YYYY-MM-DD` format

  let result = {
    monthAndDate: formatDate(parsedDate1),
    formatted: formatDateWithYear(parsedDate1),
    noOfDays: 1,
  };

  if (date2) {
    const parsedDate2 = new Date(date2);

    // Calculate the number of days between two dates
    const diffInTime = parsedDate2.getTime() - parsedDate1.getTime();
    const noOfDays = Math.max(1, diffInTime / (1000 * 60 * 60 * 24) + 1);

    result.noOfDays = noOfDays;
    result.formatted = `${formatDate(parsedDate1)} - ${formatDate(parsedDate2)}`;
  }

  return result;
}

  
export default parseDate;