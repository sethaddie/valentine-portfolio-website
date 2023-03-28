const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Enable cross-origin resource sharing
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'roy.eugenes000@gmail.com',
    pass: '......'
  }
});

const mailOptions = {
  from: 'roy.eugenes000@gmail.com',
  to: 'roy.eugenes000@gmail.com',
  subject: 'New message from your website',
  html: ''
};

app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  mailOptions.html = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Subject: ${subject}</p><p>Message: ${message}</p>`;

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send('error');
    } else {
      console.log(info);
      res.status(200).send('success');
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
