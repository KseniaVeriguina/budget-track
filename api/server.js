'use strict';

const bodyParser = require('body-parser');
const express    = require('express');
const app        = express();
const path       = require( 'path' );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/healthcheck', require('./routes/index').router);
app.use('/login', require('./routes/login').router);
app.use('/income', require('./routes/income').router);
app.use('/expenses', require('./routes/expenses').router);


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const errors = [
      { message: 'unauthorized' },
    ];

    res.status(401).json({ errors });
  }
});

// Direct to build folder on deploy
app.use( '/', express.static( path.join( __dirname, '../build' ) ) )

// Send back to index if user tries to go to undefined url.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

module.exports = app;
