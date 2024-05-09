import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/emaiil/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
  //   new MongoLogDatasource()
  //   new FileSystemDatasource()
);
const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // new SendEmailLogs(emailService, logRepository).execute([
    //   "igorhinojosacastro@gmail.com",
    //   "igorhc89@gmail.com",
    // ]);

    // emailService.sendEmailWithFileSystemLogs([
    //   "igorhinojosacastro@gmail.com",
    //   "igorhc89@gmail.com",
    // ]);

    // emailService.sendEmail({
    //   to: "igorhinojosacastro@gmail.com",
    //   subject: "Logs del sistema",
    //   htmlBody: `
    // 	<h3>Logs del sistema - NOC</h3>
    // 	<p>Non eiusmod ipsum quis aliquip laborum nisi ea occaecat laboris nulla labore veniam. Tempor consequat sunt labore consectetur eu aute amet dolore veniam ipsum. Laborum aliquip deserunt officia ex. Minim ea voluptate cillum ut ipsum sint cillum mollit aliquip reprehenderit velit consequat aliquip voluptate. Reprehenderit minim eu in esse eu pariatur proident aliqua minim eu excepteur. Consequat incididunt eu Lorem est cillum duis ea deserunt non veniam excepteur in qui.</p>
    // 	<p>Ver logs adjuntos</p>
    // 	`,
    // });

    // const job = CronService.createJob("*/5 * * * * * ", () => {
    //   const url = "http://localhost:3000";
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`Success: ${url}`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
    // const job = CronService.createJob("*/5 * * * * * ", () => {
    //   const url = "https://google.com";
    //   new CheckServiceMultiple(
    //     [fsLogRepository, postgresLogRepository, mongoLogRepository],
    //     () => console.log(`Success: ${url}`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
