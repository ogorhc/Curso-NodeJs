import { createContainer, asClass, InjectionMode } from "awilix";
import { GithubController } from "./presentation/github/controller";
import { GithubService } from "./presentation/services/github.service";
import { DiscordService } from "./presentation/services/discord.service";

export class Container {
  static setup() {
    const container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
      strict: true,
    });
    return container.register({
      githubController: asClass(GithubController),
      githubService: asClass(GithubService),
      discordService: asClass(DiscordService),
    });
  }
}
