const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();

const route = require('./api/routes');
const db = require('./configs/database');
const cloudinary = require('./configs/cloudinary');
const port = process.env.PORT || 8080;

require('dotenv').config();

app.use(cors());

// Connect to DB
db.connect();

// config cloudinary
cloudinary.config();

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan
app.use(morgan('dev'));

// Routes init
route(app);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json(error);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
