// Use express library, port 4000
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Open connection to db
const ConnectionString = 'mongodb+srv://admin:admin@cluster0.y6kff.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(ConnectionString, {useNewUrlParser: true});

// Define Schema
const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
});
var MovieModel = mongoose.model("movie", movieSchema);

// parse application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extend: false}));

// parse application/json
app.use(bodyParser.json());

// Always use for cors
app.use(cors());
app.use(function (req, res, next) { 
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next(); 
});

// Get request for api/movies that returns json
app.get('/api/movies', (req, res) => {
    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018", "imdbID": "tt4154756", "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }
    // ];
    MovieModel.find((err, data)=>{
        res.json(data);
    })

    // res.status(200).json({
    //     message: "Everything is ok",
    //     movies: mymovies
    // });
})

// Find Movie by ID 
app.get('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})

// Update movie
app.put('/api/movies/:id', (req, res)=>{
    console.log("Update movie: " + req.params.id);
    console.log(req.body);

    MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })
})

// Delete Movie
app.delete('/api/movies/:id',(req,res)=>{
    console.log("Delete Movie: " + req.params.id);

    MovieModel.findByIdAndDelete(req.params.id, (err, data)=>{
        res.send(data);
    })
})

// Pull data from body and log
app.post('/api/movies', (req, res) => {
    console.log('Movie Recieved!');
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    MovieModel.create({
        title:req.body.Title,
        year:req.body.Year,
        poster:req.body.Poster
    })

    res.send('Item Added');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})