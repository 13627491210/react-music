export const setItem = (key, val) => {
  return localStorage.setItem(key, val);
};
export const getItem = key => {
  return localStorage.getItem(key);
};
export const removeItem = key => {
  return localStorage.removeItem(key);
};
