// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
//use express to handle json requests
app.use(express.json());

// Sample data
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
    { id: "qwe123", name: "Cindy", job: "Zookeeper"}
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
  res.status(200).send(); // send a success response with status code 200
});

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//Hard delete by user id
app.delete('/users/:id', (req, res) => {
  const userID = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ message: `User with id ${userId} deleted.` });
} else {
    res.status(404).json({ message: 'User not found.' });
}
});

// Get all users matching a given name and job
app.get('/users/search', (req, res) => {
  const { name, job } = req.query;
  if (!name || !job) {
      return res.status(400).json({ message: 'Name and job are required.' });
  }

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()) && user.job.toLowerCase().includes(job.toLowerCase()));

  if (filteredUsers.length > 0) {
      res.status(200).json(filteredUsers);
  } else {
      res.status(404).json({ message: 'No users found matching your criteria.' });
  }
});
