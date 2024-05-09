import { SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogRepository } from "./log.repository";

describe("log.repository.ts LogRepository", () => {
  const logEntity = new LogEntity({
    origin: "log.repository.ts",
    message: "test-message",
    level: LogSeverityLevel.low,
  });
  class MockLogRepository implements LogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [logEntity];
    }
  }

  test("should test the abstract class", async () => {
    const mockLogRepository = new MockLogRepository();

    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);

    expect(typeof mockLogRepository.saveLog).toBe("function");
    expect(typeof mockLogRepository.getLogs).toBe("function");

    await mockLogRepository.saveLog(logEntity);
    const logs = await mockLogRepository.getLogs(logEntity.level);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
