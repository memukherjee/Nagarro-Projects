const express = require('express');
const mongoose = require('mongoose');


const app = express();
let movieCount = 0;
mongoose.connect('mongodb://localhost:27017/movieDB_nagarro')
.then(() => {
    console.log('Connected to MongoDB');
})

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: String,
    year: Number
});


const Movie = mongoose.model('Movie', movieSchema);

Movie.countDocuments({},(err, count) => {
    movieCount = count;
    console.log(movieCount);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the movie API' });
});

app.get('/all', (req, res) => {
    Movie.find({}, (err, movies) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting all movies' });
        } else {
            res.status(200).json(movies);
        }
    });
});


app.get('/movie/:id', (req, res) => {
    const id = req.params.id;
    Movie.findOne({id}, (err, movie) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting movie' });
        } else {
            if(!movie){
                movie= {message: 'Movie not found'};
            }
            res.status(200).json(movie);
        }
    });
});


app.post('/movie', (req, res) => {
    const {name, year} = req.body
    movieCount++;
    const movie = new Movie({ id:movieCount, name, year});
    movie.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error saving movie details' });
        } else {
            res.status(200).json({message: 'Movie saved successfully'});
        }
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});