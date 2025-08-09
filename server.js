const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

const { LocalStorage } = require('node-localstorage');
global.localStorage = new LocalStorage('./scratch');

let users = JSON.parse(localStorage.getItem("users")) || [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (user == null) {
    return res.status(400).json({ message: 'Cannot find user' });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: 'Success' });
    } else {
      res.status(403).json({ message: 'Not allowed' });
    }
  } catch {
    res.status(500).send();
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

