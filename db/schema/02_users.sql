DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
  admin BOOLEAN NOT NULL DEFAULT FALSE
);
INSERT INTO users  VALUES (1, 'Alice', 'alice56@hotmail.com', '124',1);
INSERT INTO users  VALUES ( 2, 'Alice','alice56@hotmail.com', '124', 1);

 INSERT INTO organization  VALUES ( 1, 'Lighthouse','LHL56@hotmail.com');
