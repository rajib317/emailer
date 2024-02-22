const http = require('http');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT;

const requestHandler = (request, response) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: 'rajib317@gmail.com',
      pass: 'somepassword',
    },
  });

  const mailOptions = {
    from: 'noreply@rtrspty.site',
    to: 'rajib317@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Lipsum Dolor sit amet',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: `Email sent: ${info.response}` }));
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.error('Something went wrong:', err);
  }

  console.log(`Server is listening on port ${PORT}`);
});
