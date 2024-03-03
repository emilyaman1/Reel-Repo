// backend; connects to database
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection( {
    host: 'database-1.c1m4ekg4o6v6.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Eea12190!',
    database: 'reelRepoDB'
});

db.connect(err => {
    if(err){
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});
/*
TODO: 
Change the accounts to query api/accounts directly, change client side
add post and get method for movies table when created
*/
app.get('/api/accounts', (req, res) => {
    db.query('SELECT * FROM accounts', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/api/accounts', (req, res) => {
    const newData = req.body;
    db.query('INSERT INTO accounts SET ?', newData, (error, results) => {
        if (error) throw error;
        res.send('Data added successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});