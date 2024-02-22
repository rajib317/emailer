# NodeJs Emailer

Lightweight app for sending emails. Project is having only one dependency. nodemailer.

1. Install dependencies

```ruby
npm install
```

2. Create a .env file and set the following ENVIRONMENT VARIABLES

PORT  
EMAIL_HOST  
EMAIL_PORT  
EMAIL_USER  
EMAIL_PASSWORD  
EMAIL_FROM  
EMAIL_SUBJECT

## Request

POST http://yourdomain.com/email  
Content-Type: application/json

```ruby
{
"to":"rajib317@gmail.com",
"subject":"Tada!!!",
"text":"What's up?!!"
}
```

## Response:

```ruby
{
"message": "Email sent",
"details": "250 OK id=1rd8Y7-00BCPV-0k"
}
```
