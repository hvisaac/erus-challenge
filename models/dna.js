const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dnaSchema = new Schema({

    date       : String,
    dna        : [],
    hasMutation: Boolean

});

module.exports = mongoose.model('dna', dnaSchema);