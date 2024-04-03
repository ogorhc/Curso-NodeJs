import fs from "fs";
import { yarg } from "./config/plugins/args.plugins";
console.log(yarg);
interface Props {
  base: number;
  limit: number;
}
export const outputTable = ({ base, limit }: Props) => {
  let output = "";

  const header = `
===========================================
===========================================
		Tabla del ${base}
===========================================
=========================================== \n
`;
  output += header;

  for (let i = 1; i <= limit; i++) {
    const line = `${base} x ${i} = ${base * i} \n`;
    output += line;
  }

  return output;
};

const { b: base, l: limit, s: showTable } = yarg;

const output = outputTable({ base, limit });

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true });

fs.writeFileSync(`outputs/table-${base}.txt`, output);

if (showTable) {
  console.log(output);
}
