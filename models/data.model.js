const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    habbies:[
        {
            type: String,
            default: "none"
        }
    ]
})

module.exports = mongoose.model('Data', dataSchema);