const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
//const morgan = require('morgan');
const { engine } = require ('express-handlebars');
const cookieParser = require('cookie-parser')

const route = require('./routes');
const db  = require('./config/db');
const telegram = require('./telegram/telegram');
const test = require('./util/test');

// Connect to telegram
//telegram.telegram_connect();


// Connect to DB
//db.connect();

//test web
test.searchTextOnGoogle();


const app = express();
const port = 3100;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({
  extended:true,
}))
app.use(methodOverride('_method'));
app.use(cookieParser());


// HTTP logger

// app.use(morgan('combined'));


// Template engines
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    Admin: (value) => {return value == 'admin'},
  },

}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));


//route init
route(app);


// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
