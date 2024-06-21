
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sudo',
    database: 'nodemysl'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('mySQL connected');
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS nodemysl';
    db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send('Database created or already exists');
    });
});

app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), phone_number VARCHAR(255), email VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Employee table created or already exists');
    });
});

app.post('/addemployee', (req, res) => {
    const { name, designation, phone_number, email } = req.body;
    const sql = 'INSERT INTO employee (name, designation, phone_number, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, designation, phone_number, email], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Employee added successfully');
    });
});

app.put('/updateemployee/:id', (req, res) => {
    const { id } = req.params;
    const { name, designation, phone_number, email } = req.body;
    const sql = 'UPDATE employee SET name = ?, designation = ?, phone_number = ?, email = ? WHERE id = ?';
    db.query(sql, [name, designation, phone_number, email, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Employee updated successfully');
    });
});

app.delete('/deleteemployee/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employee WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Employee deleted successfully');
    });
});

app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.listen('5500', () => {
    console.log('Server started at port 5500');
});

