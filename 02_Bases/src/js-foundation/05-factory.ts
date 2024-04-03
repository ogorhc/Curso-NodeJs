// const { getUUID, getAge } = require("../plugins");
interface BuildMakerPersonOptions {
  getUUID: () => string;
  getAge: (birthdate: string) => number;
}

interface PersonOptions {
  name: string;
  birthdate: string;
}

export const buildMakePerson = ({
  getUUID,
  getAge,
}: BuildMakerPersonOptions) => {
  return ({ name, birthdate }: PersonOptions) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    };
  };
};

const obj = { name: "John", birthdate: "1985-10-21" };

// const john = buildPerson(obj);
