//save item to localstorage
export const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    console.error(error);
    }
}
//get item from localstorage
export const getFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}