require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
// Middleware packages
const bodyParser = require('body-parser');
// Routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const memeRoutes = require('./routes/meme');
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware packages

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

// Mongoose connection to MongoDB. (https://mongoosejs.com/docs/guide.html)
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.MONGODB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Passport JWT setup.
app.use(passport.initialize());
require('./config/passport')(passport);

// Middleware to use when routes require authenticated user.
const requiresAuth = passport.authenticate('jwt', { session: false });

// Login and register routes here don't require authenticated user.
app.use('/api/auth', authRoutes);

// For all authenticated routes, make sure to use this
app.use('/api/users', requiresAuth, usersRoutes);

// For memes created by users
app.use('/api/memes', requiresAuth, memeRoutes);

// For production, serve compiled React app in client build directory.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});