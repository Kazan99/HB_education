const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');


const Courses = new Schema({
    name: { type: String, required: true},
    description: { type: String},
    image: { type: String},
    slug:{ type: String, slug:'slug', unique:true},
    video:{ type: String},
    
},
{
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug);
Courses.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all', 
});

module.exports = Courses;