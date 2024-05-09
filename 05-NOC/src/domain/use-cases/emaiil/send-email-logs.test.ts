import { SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("SendEmailService send-email-logs.test.ts", () => {
  const emailServiceMock = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };
  const logRepositoryMock: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const sendEmailLogs = new SendEmailLogs(
    emailServiceMock as any,
    logRepositoryMock
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should call sendEmail and saveLog when EmailService returns true", async () => {
    const result = await sendEmailLogs.execute("igor@igor.com");

    expect(result).toBe(true);
    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith({
      message: "Log email sent",
      level: "low",
      createdAt: expect.any(Date),
      origin: "send-email-logs.ts",
    });
  });

  test("should log in case of error", async () => {
    emailServiceMock.sendEmailWithFileSystemLogs.mockResolvedValue(false);
    const result = await sendEmailLogs.execute("igor@igor.com");
    expect(result).toBe(false);
    expect(emailServiceMock.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith({
      message: "Error: Email log not sent",
      level: "high",
      createdAt: expect.any(Date),
      origin: "send-email-logs.ts",
    });
  });
});
