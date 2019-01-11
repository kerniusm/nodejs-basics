var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//kaip atrodys musu Post lentele duombazeje
var PostSchema = new Schema({
    user_id: String, //kieno ikelta nuotrauka
    description: String,
    image_path: String, //nuoroda i paveiksliuka
});


module.exports = mongoose.model('Post', PostSchema);