const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    item:{
        type: String,
        required: true
    },
    isChecked:{
        type: Boolean,
        default:false
    },
    date: String
});

const TodoItem = mongoose.model('TodoItem', todoSchema);

module.exports = TodoItem;