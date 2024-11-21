const months = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentabr',
  'Oktabr',
  'Noyabr',
  'Dekabr'
];
export const formatDate = date => {
  const safeDate = new Date(date);
  const day = safeDate.getDate();
  const month = months[safeDate.getMonth()];
  const year = safeDate.getFullYear();
  return `${getDoubleDigit(day)} ${month}, ${year}`;
};

export const formatTime = date => {
  const safeDate = new Date(date);
  const hours = safeDate.getHours();
  const minutes = safeDate.getMinutes();
  return `${getDoubleDigit(hours)}:${getDoubleDigit(minutes)} ${formatDate(date)}`;
};
export const getDoubleDigit = digit => (digit > 9 ? digit : `0${digit}`);
