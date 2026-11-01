import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing and JSON body parsing
app.use(cors());
app.use(express.json());

// Create Nodemailer Transporter
// Supports Gmail App Passwords (default) or custom SMTP credentials
const createTransporter = () => {
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const transporter = createTransporter();

// Verify email server connection on startup
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter.verify((error) => {
    if (error) {
      console.warn('⚠️ Nodemailer Transporter Warning: Invalid credentials or authentication error.');
      console.warn(error.message);
    } else {
      console.log('✅ Nodemailer Transporter is ready to send messages via', process.env.EMAIL_SERVICE || 'SMTP');
    }
  });
} else {
  console.log('ℹ️ Nodemailer: EMAIL_USER and EMAIL_PASS not set yet in .env.');
  console.log('Please configure .env to begin delivering emails.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Portfolio Nodemailer Server',
    emailConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS),
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and message.',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(503).json({
        success: false,
        message:
          'Server email service is not configured. Please set EMAIL_USER and EMAIL_PASS in .env file.',
      });
    }

    const recipient = process.env.EMAIL_RECEIVER || process.env.EMAIL_USER;
    const emailSubject = subject?.trim() || `Portfolio Inquiry from ${name}`;

    // Modern HTML email template
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

    // Mail options
    const mailOptions = {
      from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: recipient,
      subject: `[Portfolio Contact] ${emailSubject}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Message sent successfully from ${email} (MessageId: ${info.messageId})`);

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting me! Your email was sent successfully. I will review your message and reach out to you soon.',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('❌ Nodemailer Error sending message:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message via email server. Please check your credentials or try again later.',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Nodemailer Backend server running on http://localhost:${PORT}`);
});
