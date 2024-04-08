export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel; //Enum
  message: string;
  createAt?: Date;
  origin: string;
}
export class LogEntity {
  public level: LogSeverityLevel; //Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createAt } = JSON.parse(json);
    const log = new LogEntity({
      message,
      level,
      createAt,
      origin: "log.entity.ts",
    });
    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createAt, origin } = object;
    const log = new LogEntity({
      message,
      level,
      createAt,
      origin,
    });
    return log;
  };
}
