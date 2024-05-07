// const { http, axios } = require("../plugins");
import { httpClientPlugin as http } from "../plugins/http-client.plugin";

export const getPokemonById = async (id: string | number): Promise<string> => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await http.get(url);

    return pokemon.name;
  } catch (error) {
    throw `Pokemon not found with id ${id}`;
  }
  //   return await fetch(url)
  //     .then((resp) => resp.json())
  //     .then(() => {
  //       throw new Error("error");
  //     })
  //     .then((data) => data.name);
};
