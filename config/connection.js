const mongoose = requirer('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialdata');


module.exports = mongoose.connection;
