const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

exports.sendEmail = functions.https.onCall(async (data, context) => {
    const { to, subject, text } = data;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
});
