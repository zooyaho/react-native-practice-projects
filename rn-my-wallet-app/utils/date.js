export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }
  // {date.toISOString().slice(0, 10)}
  return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
};
