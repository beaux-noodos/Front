export const dateFormatter = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return "";
  }

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = months[monthIndex];

  return `${day} ${monthName} ${year}`;
  };
  