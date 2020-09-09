const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
const route = require('./api/routes');
const db = require('./configs/mongoose.config');
const cloudinary = require('./configs/cloudinary.config');
const sendgrid = require('./configs/sendgrid.config');
const port = process.env.PORT || 8080;

require('dotenv').config();

// Connect to DB
db.connect();

// config cloudinary
cloudinary.config();

// config sendgrid
sendgrid.config();

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan
app.use(morgan('dev'));

// Routes init
route(app);

// handle Error
app.use(errors({ statusCode: 401 }));
//app.use(handleError);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
