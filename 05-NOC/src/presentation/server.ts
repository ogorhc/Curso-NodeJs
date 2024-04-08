import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemlogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log("Server started...");

    const job = CronService.createJob("*/5 * * * * * ", () => {
      const url = "http://localhost:3000";
      new CheckService(
        fileSystemlogRepository,
        () => console.log(`Success: ${url}`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
