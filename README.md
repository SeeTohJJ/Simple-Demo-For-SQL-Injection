# Simple-Demo-For-SQL-Injection
This is a simple SQL injection demo used in SC3010 presentation on the topic of TalkTalk vulnerability. 
The web application is a simple login screen that retrives user profile data from the postgres database.
This project is meant to present how to execute and prevent simple SQL injection to a vulnerable webpage.

# 1. Frontend Setup (Vite + React)
```bash
cd Frontend
npm install
npm run dev
```
*Note: The frontend runs on `http://localhost:5173`.*

# 2. Backend Setup (SpringBoot)
```bash
cd Backend
./mvnw spring-boot:run
```
*Note: The backend runs on `http://localhost:8081`.*

# 3. Database (Postgres)

Run the following SQL to create the users table and seed sample data:
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    gender VARCHAR(10)
);

INSERT INTO users (username, password, name, email, gender) VALUES
('admin', 'admin123', 'Admin User', 'admin@example.com', 'Male'),
('john_doe', 'password123', 'John Doe', 'john@example.com', 'Male'),
('jane_smith', 'qwerty123', 'Jane Smith', 'jane@example.com', 'Female'),
('michael_b', 'pass1234', 'Michael Brown', 'michael@example.com', 'Male'),
('sarah_w', 'hello123', 'Sarah Wong', 'sarah@example.com', 'Female'),
('david_k', 'abc12345', 'David Kim', 'david@example.com', 'Male'),
('lisa_t', 'lisa2024', 'Lisa Tan', 'lisa@example.com', 'Female'),
('ryan_lee', 'ryanpass', 'Ryan Lee', 'ryan@example.com', 'Male'),
('emma_chen', 'emma999', 'Emma Chen', 'emma@example.com', 'Female'),
('kevin_foo', 'kevin321', 'Kevin Foo', 'kevin@example.com', 'Male'),
('olivia_ng', 'olivia888', 'Olivia Ng', 'olivia@example.com', 'Female'),
('test_user', 'test123', 'Test User', 'test@example.com', 'Other');
```
