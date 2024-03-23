export const getDataFromLocalStorage = (key: string) => {
  const result = localStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return null;
};

export const setDataToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
