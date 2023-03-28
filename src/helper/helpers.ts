import moment from 'moment';

/**
 * Class with methods to help your life... LOL
 */
export default class Helpers {
  /**
   * Generates OTP.
   * @param  {email} string - The email to check.
   * @return {object} - The result.
   */
  static generateOtp = (
    email: string
  ): { email: string; otp: string; expiresAt: string } => {
    const format = 'YYYY-MM-DD HH:mm:ss';
    const date = moment(Date.now() + 3600000).format(format);
    const otp = {
      email,
      otp: `${Math.floor(1000 + Math.random() * 9000)}`,
      expiresAt: date,
    };

    return otp;
  };
}
