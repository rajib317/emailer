const http = require('http');
const nodemailer = require('nodemailer');

const PORT = 3000;

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: 'rajib317@gmail.com',
    pass: 'xsmtpsib-2b6b907002c295354eea145f3a0cdaced26baa8dcbffbc50b6d3b4e3b87e9f49-bYajKmJEBzyUAtNF',
  },
});

const mailOptions = {
  from: 'noreply@rtrspty.site',
  to: 'rajib317@google.com',
  subject: 'Sending Email using Node.js',
  text: 'Lipsum Dolor sit amet',
};

const requestHandler = (request, response) => {
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
