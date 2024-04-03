import { Hero, heroes } from "../data/heroes";

export const findHeroById = (id: number) => {
  return heroes.find((hero: Hero) => hero.id === id);
};
