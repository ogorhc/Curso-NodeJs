import "dotenv/config";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  Server.start();

  //   const prisma = new PrismaClient();
  //   const newLog = await prisma.logModel.create({
  //     data: {
  //       level: "HIGH",
  //       message: "Test message postgres",
  //       origin: "App.ts",
  //     },
  //   });

  //   const logs = await prisma.logModel.findMany({
  //     where: {
  //       level: "HIGH",
  //     },
  //   });
  //   console.log(logs);

  // Grabar una colección = tables, documento = registro
  // const newLog = await LogModel.create({
  //   message: "Test message desde mongo",
  //   origin: "App.ts",
  //   level: "low",
  // });

  // await newLog.save();
  // console.log(newLog);

  // const logs = await LogModel.find();
  // console.log(logs);
}
