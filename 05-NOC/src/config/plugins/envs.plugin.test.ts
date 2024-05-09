import { envs } from "./envs.plugin";

describe("envs.plugin,ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "igorhinojosacastro@gmail.com",
      MAILER_SECRET_KEY: "123123123",
      PROD: false,
      MONGO_URL: "mongodb://igor:123456@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "igor",
      MONGO_PASS: "123456",
      POSTGRES_URL: "postgresql://postgres:123456@localhost:5432/NOC-TEST",
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_USER: "postgres",
      POSTGRES_PASS: "123456",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";
    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
