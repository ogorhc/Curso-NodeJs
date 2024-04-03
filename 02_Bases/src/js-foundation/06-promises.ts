const { http, axios } = require("../plugins");

const getPokemonById = async (id: string | number): Promise<string> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await axios.get(url);

  return pokemon.name;
  //   return await fetch(url)
  //     .then((resp) => resp.json())
  //     .then(() => {
  //       throw new Error("error");
  //     })
  //     .then((data) => data.name);
};

module.exports = getPokemonById;
