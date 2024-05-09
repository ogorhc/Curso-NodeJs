import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email-service";

describe("EmailService", () => {
  const email = "igor@gmail.com";
  const mockSendEmail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });

  const emailService = new EmailService();

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: email,
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    };

    const emailSent = await emailService.sendEmail(options);

    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: email,
    });
  });

  test("should send email with attachments", async () => {
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendEmail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { fileName: "logs-all.log", path: "./logs/logs-all.log" },
        { fileName: "logs-medium.log", path: "./logs/logs-medium.log" },
        { fileName: "logs-high.log", path: "./logs/logs-high.log" },
      ]),
    });
  });
});
