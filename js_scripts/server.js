
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = 3000;

sgMail.setApiKey('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');

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { email, username } = req.body;
  const msg = {
    to: email,
    from: 'your-email@example.com', // your verified SendGrid sender
    subject: 'Welcome to Our Service!',
    text: `Hello ${username},\n\nThank you for signing up! Your registration is successful.`,
    html: `<p>Hello ${username},</p><p>Thank you for signing up! Your registration is successful.</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send('Email sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending email');
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
