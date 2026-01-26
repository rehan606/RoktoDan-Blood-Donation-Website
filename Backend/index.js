const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000

// MiddleWare
app.use(cors());
app.use(cors({
//   origin: 'https://medimart-cbe0f.web.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
res.send(`server is running `);
})

app.listen(port, () => {
console.log(`Coffee server is running by port ${port}`);
})