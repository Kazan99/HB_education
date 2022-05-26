module.exports = {
    mutipleMongooseToObject: function (mongoosesArray) {
        return mongoosesArray.map(mongoosesArray => mongoosesArray.toObject());
    },
    mongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};