DROP TABLE IF EXISTS passwords CASCADE;
CREATE TABLE passwords (
  id SERIAL PRIMARY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE ON CASCADE,
  website_url VARCHAR(255) NOT NULL,
  website_username VARCHAR(255) NOT NULL,
  website_password VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE ON CASCADE,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE ON CASCADE
);
