import jwtDecode from "jwt-decode";

export const setToken = (token) => localStorage.setItem("fynd_token", token);
export const getToken = () => localStorage.getItem("fynd_token");
export const clearToken = () => localStorage.removeItem("fynd_token");

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      clearToken();
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
