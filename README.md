# Northcoders News API

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders].
I completed it in 4 days, after a two week introduction to back-end.

The project is a work in progress and is not yet complete.

The technologies used in this project are:
Express.js
PostgreSQL
Jest
Supertest
The data is stored in a Postgres database, which is created and accessed with raw SQL queries using the pg package.

It was deployed using Supabase and Render.

This api is the backend service which accesses application data programatically. It is used in a web application that renders different articles, similar to a news application.

Here is the link to the hosted version: https://nc-news-project-1-zm9p.onrender.com/api

# Instructions for cloning

Fork the repository (check "copy the main branch only") and clone your fork to your local machine
https://github.com/AlexStraton/Nc-News-Project.git

# Instructions for installing dependencies

npm i will install all the dependencies in the package.json

# Instructions for seeding the local database

To seed the database run the following commands:
psql -f ./db/setup.sql
node ./db/seeds/run-seed.js

# Instructions for running the tests

npm test endpoints

# Instructions for creating environment variables

Create two files in the root directory: .env.test and .env.development and add the following environment variables:

PGDATABASE= name_of_correct_database
(check the names of the databases in the /db/setup.sql file )

## In order to run this project you will need Node.Js v21.7.2. or above and PostgreSQL 14.11 or above.

(https://northcoders.com/)
