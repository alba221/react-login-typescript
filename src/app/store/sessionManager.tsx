export const saveToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const removeSessionToken = () => {
  sessionStorage.removeItem("token");
};

export const isUserLoggedIn = () => {
  return sessionStorage.getItem("token") !== null;
};
