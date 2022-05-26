const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const CourseShow = new Schema({
    name: { type: String, required: true},
    description: { type: String},
    slug:{ type: String},
    video:{ type: String},
    
},
{
    timestamps: true,
});

// Add plugins
CourseShow.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all', 
});

module.exports = CourseShow;