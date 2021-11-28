-- Drop and recreate Users table (Example)

-- DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
 email VARCHAR (255) NOT NULL,
 password VARCHAR (255) NOT NULL,
 organization_id INTEGER REFERENCES organization(id) ON DELETE CASCADE
);
 CREATE TABLE organization (
   id SERIAL PRIMARY KEY NOT NULL,
   name VARCHAR(255),
   email VARCHAR(255)
 );

 CREATE TABLE passwords (
   id SERIAL PRIMARY KEY NOT NULL,
   website_url VARCHAR(255) NOT NULL,
   website_username VARCHAR(255) NOT NULL,
   website_pass VARCHAR(255) NOT NULL,
   organization_id INTEGER REFERENCES organization(id) ON DELETE CASCADE,
   category_id INTEGER REFERENCES category(id) ON DELETE CASCADE

 );

 CREATE TABLE category (
   id SERIAL PRIMARY KEY NOT NULL,
   name VARCHAR(255)
 );
