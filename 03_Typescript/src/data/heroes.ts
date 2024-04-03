export const heroes: Hero[] = [
  {
    id: 1,
    name: "Ironman",
    owner: "Marvel",
  },
  {
    id: 2,
    name: "Spiderman",
    owner: "Marvel",
  },
  {
    id: 3,
    name: "Batman",
    owner: "DC",
  },
];

export interface Hero {
  id: number;
  name: string;
  owner: string;
}
