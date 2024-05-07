// import { getAge as getAgePlugin } from "get-age";

export const getAge = (birthdate: string) => {
  if (!birthdate) return new Error("birthdate is required");

  //   return getAgePlugin(birthdate);

  return new Date().getFullYear() - new Date(birthdate).getFullYear();
};
