require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const app = express();
const users = require('./routes/api/users/users');
app.use(
	cors({
		origin      : true,
		credentials : true,
	}),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// db('login').where('id', 123).select().then(papers => console.log(papers)).catch(err => console.log(err));
app.use(passport.initialize());

require('./config/passport');
app.use('/api/users', users);
const port = process.env.PORT || 5000;
app.get('/', (req, res) => res.json({ message: 'Server working' }));

app.listen(port, () => console.log(`Server listening on port ${port}`));
