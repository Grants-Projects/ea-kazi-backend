/** @format */

import { injectable } from "tsyringe";
import { config } from "../config";
import { IResponse } from "../common/http.interface";
import sgMail from "@sendgrid/mail";
import * as path from "path";
import * as ejs from "ejs";
sgMail.setApiKey(config.sendgrid.sendgrid_api_key);

@injectable()
export class EmailService {
  constructor(
  ) {}

  sendEmail = async (
    res: IResponse,
    subject : string,
    template_name: string,
    recipient_email: string,
    short_response_message: string,
    action_url: string,
    email_data?: string
  ) => {
    try {
      const template = await ejs.renderFile(
        path.join(__dirname, `../templates/${template_name}.ejs`),
        {
          email: recipient_email,
          action_url,
          email_data
        }
      );

      if (!template) {
        return res.forbidden(null, "Template doesn't exist");
      }

      const emailData = {
        from: config.sendgrid.email_from,
        to: recipient_email || null,
        subject: `${subject}` || 'Welcome',
        html: template,
      };

      const send = await sgMail.send(emailData);
      if (!send) {
        return res.serverError(
          send,
          "Unable to send emails at this time. Please try again later"
        );
      } else {
        return res.ok(
          null,
          `An Email has been sent to ${recipient_email}. Please follow the instructions to ${short_response_message}`
        );
      }
    } catch (error) {
      return res.serverError(
        error,
        error.message || "An unknown error occured. Please try again later"
      );
    }
  };
}
