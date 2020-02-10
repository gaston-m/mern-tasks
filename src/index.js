const express = require ('express');
const app = express();
const morgan = require('morgan');
const path = require ('path');

const { mongoose } = require('./database');

///---------MIDDLEWARES--------------

app.use(morgan('dev'));
app.use (express.json());


//----------SETTINGS-----------------

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));



//----------ROUTES-----------------

app.use('/api/tasks', require('./routes/tasks.routes.js'));

//-----------STATIC FILES------------------


///--------INICIALIZANDO EL SERVIDOR---------------

app.listen(app.get('port'), () => {

    console.log('Server iniciado en Port',app.get('port'))
});
