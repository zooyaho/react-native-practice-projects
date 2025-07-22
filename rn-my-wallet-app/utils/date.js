export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }
  return date.toISOString().slice(0, 10);
  // return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
};

export const getDateMinusDays = (date, days) => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() - days);
  return resultDate;
};
