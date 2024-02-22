const http = require('http');
const nodemailer = require('nodemailer');
require('dotenv').config();
const PORT = process.env.PORT;

const requestHandler = (request, response) => {
  if (!(request.method === 'POST' && request.url === '/email')) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: `Not found` }));
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const chunks = [];

  request.on('data', (chunk) => {
    chunks.push(chunk);
  });
  request.on('end', () => {
    data = Buffer.concat(chunks);
    const stringData = data.toString();

    const { to, subject, text } = JSON.parse(stringData);

    if (!to || !subject || !text) {
      response.writeHead(402, { 'Content-Type': 'text/json' });
      response.end(JSON.stringify({ message: 'Bad format' }));
      return;
    }
    mailOptions = { from: process.env.EMAIL_FROM, to, subject, text };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        response.writeHead(500, { 'Content-Type': 'text/json' });
        response.end(JSON.stringify({ message: 'Internal Server Error' }));
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(
          JSON.stringify({ message: 'Email sent', details: info.response })
        );
      }
    });
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.error('Something went wrong:', err);
  }

  console.log(`Server is listening on port ${PORT}`);
});
