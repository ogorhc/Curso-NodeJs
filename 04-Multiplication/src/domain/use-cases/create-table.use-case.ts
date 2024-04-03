export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() /*
   * DI - Dependecy Injection
   */ {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let output: string = "";
    for (let i = 1; i <= limit; i++) {
      const line = `${base} x ${i} = ${base * i} \n`;
      output += line;
    }
    return output;
  }
}
