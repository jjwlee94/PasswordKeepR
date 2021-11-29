CREATE TABLE passwords (
  id SERIAL PRIMARY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE ON CASCADE,
  website_url VARCHAR(255) NOT NULL,
  website_username VARCHAR(255) NOT NULL,
  website_password VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE ON CASCADE,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE ON CASCADE
);

INSERT INTO passwords (id, website_url, website_username, website_password,user_id, category_id, organization_id) VALUES
(1,'https://www.youtube.com/', 'hello@youtube.com','password',1,3,1 )
(2,'https://www.facebook.com/', 'world@facebook.com','password',1,1,1 )
(3,'https://www.linkedin.com/', 'github@linkedin.com','password',1,2,1 )
(4,'https://twitter.com/', 'github@twitter.com','password',2,3,1 )
(5,'https://www.youtube.com/', 'hello@youtube.com','password',2,3,1 )
(6,'https://www.facebook.com/', 'world@facebook.com','password',2,1,1 )
(7,'https://www.linkedin.com/', 'github@linkedin.com','password',2,2,1 )
(8,'https://twitter.com/', 'github@twitter.com','password',2,3,1 )
