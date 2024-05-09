import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepositoryImpl", () => {
  const logDatasourceMock = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const logRepositoryImpl = new LogRepositoryImpl(logDatasourceMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("saveLog should call the datasource with arguments", () => {
    const log = { level: LogSeverityLevel.high, message: "hola" } as LogEntity;
    logRepositoryImpl.saveLog(log);
    expect(logDatasourceMock.saveLog).toHaveBeenCalledWith(log);
  });
  test("getLogs should call the datasource with arguments", async () => {
    const severityLow = LogSeverityLevel.low;
    const logs = await logRepositoryImpl.getLogs(severityLow);
    expect(logDatasourceMock.getLogs).toHaveBeenCalledWith(severityLow);
  });
});
