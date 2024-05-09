import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
  //  TOOD: attachments
}

export interface Attachment {
  fileName: string;
  path: string;
}

// TODO: attachments

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
    	<h3>Logs del sistema - NOC</h3>
    	<p>Non eiusmod ipsum quis aliquip laborum nisi ea occaecat laboris nulla labore veniam. Tempor consequat sunt labore consectetur eu aute amet dolore veniam ipsum. Laborum aliquip deserunt officia ex. Minim ea voluptate cillum ut ipsum sint cillum mollit aliquip reprehenderit velit consequat aliquip voluptate. Reprehenderit minim eu in esse eu pariatur proident aliqua minim eu excepteur. Consequat incididunt eu Lorem est cillum duis ea deserunt non veniam excepteur in qui.</p>
    	<p>Ver logs adjuntos</p>
    	`;
    const attachments: Attachment[] = [
      { fileName: "logs-all.log", path: "./logs/logs-all.log" },
      { fileName: "logs-medium.log", path: "./logs/logs-medium.log" },
      { fileName: "logs-high.log", path: "./logs/logs-high.log" },
    ];
    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
