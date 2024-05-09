import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

describe("App", () => {
  MongoDatabase.connect = jest.fn();
  Server.start = jest.fn();
  test("should call db connect and server start", async () => {
    await import("./app");

    expect(MongoDatabase.connect).toHaveBeenCalled();
    expect(MongoDatabase.connect).toHaveBeenCalledWith({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
    expect(Server.start).toHaveBeenCalled();
  });
});
