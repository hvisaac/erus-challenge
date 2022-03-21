const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dna-challenge')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));