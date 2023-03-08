# MagFish Node.js microservice

## Setup

### Environment

Create .env file from .env.example, then put correct values

- NODE_ENV
- magento store url
- consumer key
- consumer secret
- access token
- token secret

For the NODE_ENV, use development when you run in local, production when you deploy

### Install required packages

You can install npm packages by running this command:
```
npm install
```

## Run

```
npm start
```

But in local development I recommend you use this.
So when you change code, server will reload automatically
```
npm run dev
```

### Swagger Api documentation

You can check api documentation here:
<server_url>:<server_port>/api-docs

For example in local development [localhost:8081/api-docs](http://localhost:8081/api-docs)
