import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly succesCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }
  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const logOptions = {
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: "check-service.ts",
      };
      const log = new LogEntity(logOptions);

      this.callLogs(log);
      //   this.logRepository.saveLog(log);
      this.succesCallback && this.succesCallback();
      return true;
    } catch (error) {
      const errorMessage = `Error: ${url} -> ${error}`;
      const logOptions = {
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: "check-service.ts",
      };
      const log = new LogEntity(logOptions);

      this.callLogs(log);
      //   this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(`Error: ${url} -> ${error}`);
      return false;
    }
  }
}
