interface User {
  id: number;
  name: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Jonh Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

export const getUserById = (
  id: number,
  callback: (error?: string, user?: User) => void
) => {
  const user = users.find(function (user) {
    return user.id === id;
  });
  if (!user) {
    return callback(`User not found with id ${id}`);
  }
  return callback(undefined, user);
};
