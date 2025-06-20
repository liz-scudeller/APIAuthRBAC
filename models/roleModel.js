const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        enum: ['admin', 'user']
    }
});

module.exports = mongoose.model('Role', roleSchema);