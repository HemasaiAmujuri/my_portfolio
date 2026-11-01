import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and message.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(503).json({
        success: false,
        message: 'Server email credentials are not configured in Vercel environment variables.',
      });
    }

    const emailPass = process.env.EMAIL_PASS.replace(/\s+/g, '');

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const recipient = process.env.EMAIL_RECEIVER || process.env.EMAIL_USER;
    const emailSubject = subject?.trim() || `Portfolio Inquiry from ${name}`;

    const htmlTemplate = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #0b0f19; color: #f1f5f9; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 24px; text-align: left;">
          <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #020617; letter-spacing: -0.025em;">
            New Portfolio Contact Message
          </h1>
          <p style="margin: 6px 0 0; font-size: 13px; color: #0f172a; opacity: 0.9;">
            Sent from Amujuri Hemasai's Portfolio Contact Form
          </p>
        </div>

        <div style="padding: 24px; background-color: #0b0f19;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 90px; font-weight: 600;">Sender:</td>
              <td style="padding: 8px 0; color: #f8fafc; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #22d3ee; font-size: 14px; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; font-weight: 600;">Subject:</td>
              <td style="padding: 8px 0; color: #f8fafc; font-size: 14px;">${emailSubject}</td>
            </tr>
          </table>

          <div style="border-top: 1px solid #1e293b; padding-top: 16px;">
            <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; font-weight: 700;">
              Message Content:
            </p>
            <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">
              ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </div>
        </div>

        <div style="background-color: #060911; padding: 16px 24px; text-align: center; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
          Reply directly to this email to reach <strong>${name}</strong> (${email})
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: recipient,
      subject: `[Portfolio Contact] ${emailSubject}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [Vercel] Message sent successfully from ${email} (MessageId: ${info.messageId})`);

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting me! Your email was sent successfully. I will review your message and reach out to you soon.',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('❌ [Vercel] Nodemailer Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message via email server. Please try again later.',
      error: error.message,
    });
  }
}
