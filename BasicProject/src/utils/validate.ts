export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string') {
    return false;
  }
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  if (email.toLowerCase().match(re)) {
    return true;
  }

  return false;
};
