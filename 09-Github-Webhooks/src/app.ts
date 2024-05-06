import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";
import { Container } from "./container";

(() => {
  main();
})();

function main() {
  const app = express();

  const container = Container.setup();

  app.use(express.json());
  app.use(GithubSha256Middleware.verifySignature);

  const controller = container.resolve<GithubController>("githubController");

  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`);
  });
}
