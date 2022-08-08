require('dotenv').config();
const express = require('express');
const harperive = require('harperive');

const app = express();
const dbClient = harperive.Client;
const db = new dbClient({
    harperHost: process.env.HARPER_HOST,
    username: process.env.HARPER_USERNAME,
    password: process.env.HARPER_PASSWORD,
    schema: process.env.HARPER_SCHEMA
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const book = { title, author };
    db.insert({ table: 'books', records: [book] },(err,response)=>{
        if(err){
            console.log(err);
            res.status(err.statusCode).send(err);
        }
        res.status(response.statusCode).send(response);
    })
});

app.post('/author',(req,res)=>{
    db.searchByValue({
        table: 'books',
        searchAttribute: 'author',
        searchValue: req.body.author,
        attributes: ['*']
    },(err,response)=>{
        if(err){
            console.log(err);
            res.status(err.statusCode).send(err);
        }
        res.status(response.statusCode).send(response.data);
    })
})

app.post('/search',(req,res)=>{
    db.searchByHash({
        table: 'books',
        hashValues: req.body.hashValues,
        attributes: ['*']
    },(err,response)=>{
        if(err){
            console.log(err);
            res.status(err.statusCode).send(err);
        }
        res.status(response.statusCode).send(response.data);
    })
})


app.delete('/delete',(req,res)=>{
    db.delete({
        table: 'books',
        hashValues: req.body.hashValues
    },(err,response)=>{
        if(err){
            console.log(err);
            res.status(err.statusCode).send(err);
        }
        res.status(response.statusCode).send(response);
    })
})

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));