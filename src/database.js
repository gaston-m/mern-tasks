const mongoose = require('mongoose');



const URI = 'mongodb://127.0.0.1:27017/mern-tasks';

mongoose.connect(URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true


})
    .then(db => console.log('MogonDB Esta Conectado'))
    .catch(err => console.error(err));


module.exports = mongoose;