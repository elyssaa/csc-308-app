// backend.js
import express from "express";

const app = express();
const port = 8000;

// Use express middleware to handle JSON requests
app.use(express.json());

// Sample data for users
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Helper function to find user by name
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"].toLowerCase() === name.toLowerCase()
  );
};

// Helper function to find user by ID
const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

// Root route - Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route to get all users
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

// Route to get a user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// Route to add a new user
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).send(); // Send a success response with status code 200
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
