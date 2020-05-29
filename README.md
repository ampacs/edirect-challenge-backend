# EDirectInsure Interview Challenge - Backend Service

## Requirements

 - MongoDB
 - npm
 - Node.js

## Setup
 
 At the root of the project, create a file named `.env` with the folowing content (generate the secret token):

 ```
 SECRET_ACCESS_TOKEN=<secret_access_token>
 ```

 Afterwards, run the following commands:

 ```
 npm install
 npm run setup-db
 npm run start
 ```

 If necessary, go to `config/config.json` and setup the port and database URL as required.