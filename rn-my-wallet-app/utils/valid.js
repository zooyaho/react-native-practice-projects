export function isValidDateYYYYMMDD(dateStr) {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(dateStr)) {
    return false;
  }

  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(dateStr);

  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() + 1 === month &&
    dateObj.getDate() === day
  );
}
