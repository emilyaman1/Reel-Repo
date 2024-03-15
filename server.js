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

app.get('/api/accounts', (req, res) => {
    db.query('SELECT * FROM accounts', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.get('/api/accounts/usernames', (req, res) => {
    db.query('SELECT username FROM accounts', (error, results) => {
        if (error) {
            console.error('Error fetching usernames:', error);
            res.status(500).send('Error fetching usernames');
        } else {
            res.json(results);
        }
    });
});
app.get('/api/accounts/emails', (req, res) => {
    db.query('SELECT email FROM accounts', (error, results) => {
        if (error) {
            console.error('Error fetching emails:', error);
            res.status(500).send('Error fetching emails');
        } else {
            res.json(results);
        }
    });
});


app.post('/api/accounts', (req, res) => {
    const newData = req.body;
    db.query('INSERT INTO accounts SET ?', newData, (error, results) => {
        if (error) throw error;
        res.send('Data added successfully');
    });
});

app.delete('/api/accounts/:username', (req, res) => {
    const username = req.params.username;
    db.query('DELETE FROM accounts WHERE username = ?', username, (error, results) => {
        if (error) {
            console.error('Error deleting account:', error);
            res.status(500).send('Error deleting account');
        } else {
            // Check if any rows were affected, indicating successful deletion
            if (results.affectedRows > 0) {
                res.send('Account deleted successfully');
            } else {
                res.status(404).send('Account not found');
            }
        }
    });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});