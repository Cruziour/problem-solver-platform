export const otpTemplate = (otp) => `
<div
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f7f7f7; padding: 20px 0;">
    <div
        style="max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); overflow: hidden;">

        <div style="background-color: #4f46e5; color: #ffffff; padding: 20px 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Problem-Solver Verification</h1>
        </div>

        <div style="padding: 30px 24px; text-align: center;">
            <p style="font-size: 16px; color: #1f2937; margin-bottom: 25px; line-height: 1.5;">
                You are receiving this email because a request was made to verify your identity.
            </p>

            <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 10px;">Your One-Time Password (OTP) is:</h2>

            <div style="margin: 25px auto;">
                <span style="
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 5px;
            background-color: #ecf0f1;
            color: #4f46e5; /* Primary accent color */
            padding: 15px 30px;
            border-radius: 8px;
            display: inline-block;
            border: 1px dashed #d1d5db;
          ">${otp}</span>
            </div>

            <p style="font-size: 14px; color: #374151; margin-top: 25px;">
                This code is valid for <strong>5 minutes</strong>. Please enter it on the verification screen to
                proceed.
            </p>
        </div>

        <div style="background-color: #fef3c7; border-top: 1px solid #fde68a; padding: 15px 24px; text-align: left;">
            <p style="font-size: 14px; color: #92400e; font-weight: 600; margin-bottom: 5px;">
                ⚠ *Security Alert: Do Not Share This Code*
            </p>
            <p style="font-size: 13px; color: #92400e; margin: 0;">
                For your protection, never share this OTP with anyone, including Problem-Solver employees. This code is
                unique to your current action.
            </p>
        </div>

        <div
            style="background-color: #f9fafb; padding: 15px 24px; text-align: center; font-size: 12px; color: #6b7280;">
            If you did not initiate this request, please disregard this email.<br />
            This is an automated message, please do not reply.<br />
            &copy; ${new Date().getFullYear()} Problem-Solver Inc. All rights reserved.
        </div>

    </div>
</div>
`;

export const forgetPasswordTemplate = (resetLink) => `
<div
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f7f7f7; padding: 20px 0;">
    <div
        style="max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); overflow: hidden;">

        <div style="background-color: #4f46e5; color: #ffffff; padding: 20px 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Problem-Solver Password Reset</h1>
        </div>

        <div style="padding: 30px 24px; text-align: center;">
            <p style="font-size: 16px; color: #1f2937; margin-bottom: 25px; line-height: 1.5;">
                You requested to reset your password. Click the button below to set a new password.
            </p>

            <a href="${resetLink}" target="_blank" style="
          display: inline-block;
          background-color: #4f46e5;
          color: #ffffff;
          font-weight: 600;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-size: 16px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin: 20px 0 10px 0;
        ">Reset Password</a>

            <p style="font-size: 14px; color: #374151; margin-top: 25px;">
                This link is valid for <strong>5 minutes</strong>. If you did not request a password reset, please
                ignore this email.
            </p>
        </div>

        <div style="background-color: #fef3c7; border-top: 1px solid #fde68a; padding: 15px 24px; text-align: left;">
            <p style="font-size: 14px; color: #92400e; font-weight: 600; margin-bottom: 5px;">
                ⚠ Security Alert
            </p>
            <p style="font-size: 13px; color: #92400e; margin: 0;">
                Never share this link with anyone. It is unique and expires quickly.
            </p>
        </div>

        <div
            style="background-color: #f9fafb; padding: 15px 24px; text-align: center; font-size: 12px; color: #6b7280;">
            If you did not initiate this request, please disregard this email.<br />
            This is an automated message, please do not reply.<br />
            &copy; ${new Date().getFullYear()} Problem-Solver Inc. All rights reserved.
        </div>

    </div>
</div>
`;

export const studentQueryTemplate = (name, email, query) => `
<div
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #f5f6fa; padding: 20px 0;">
    <div
        style="max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07); overflow: hidden;">

        <div style="background-color: #7c3aed; color: #ffffff; padding: 20px 24px; text-align: center;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 600;">🚀 New Student Query</h2>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Problem-Solver Support Team</p>
        </div>

        <div style="padding: 30px 24px;">
            <p style="font-size: 15px; color: #1f2937; line-height: 1.5; margin-bottom: 22px;">
                A student has submitted a query from the About Page. Please review the details below and respond
                accordingly.
            </p>

            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 18px;">
                <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #6d28d9; font-weight: 600;">Full Name:</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #374151;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #6d28d9; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #374151;">${email}</td>
                </tr>
                <tr>
                    <td
                        style="padding: 8px 5px 8px 0; font-size: 14px; color: #6d28d9; font-weight: 600; vertical-align: top;">
                        Query:</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #374151; line-height: 1.5;">
                        ${query}
                    </td>
                </tr>
            </table>

            <p style="font-size: 13px; color: #4b5563;">
                Kindly follow up with the student at the earliest opportunity.
            </p>
        </div>

        <div style="background-color: #f3e8ff; border-top: 1px solid #e9d5ff; padding: 14px 24px;">
            <p style="font-size: 13px; font-weight: 600; color: #5b21b6; margin: 0 0 4px;">
                🔐 Privacy Note
            </p>
            <p style="font-size: 12px; color: #5b21b6; margin: 0;">
                Please handle the student details carefully and avoid sharing outside the support team.
            </p>
        </div>

        <div
            style="background-color: #f9fafb; padding: 12px 24px; text-align: center; font-size: 12px; color: #6b7280;">
            This is an automated notification email.<br />Do not reply directly.<br />
            &copy; ${new Date().getFullYear()} Problem-Solver Inc. All rights reserved.
        </div>

    </div>
</div>
`;
