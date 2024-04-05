import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    const job = CronService.createJob("*/2 * * * * * ", () => {
      const url = "http://localhost:3000/comments";
      new CheckService(
        () => console.log(`Success: ${url}`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
