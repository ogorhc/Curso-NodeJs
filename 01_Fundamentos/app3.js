const fs = require("fs");

const content = fs.readFileSync("readme.md", "utf-8");

const words = content.split(" ");
const wordsCount = words.length;

// const reactWords = words.filter((word) => word.toLowerCase() === "react");
// const reactWordsCount = reactWords.length;

const reactWordsCount = content.match(/react/gi).length;

console.log("Palabras: ", wordsCount);
console.log("Palabras React: ", reactWordsCount);
