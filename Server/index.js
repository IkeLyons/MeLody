import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan';
import pg from 'pg';
import userLogin from './routes/login.js'

const PORT = 4000;   

const app = express();


app.use(json({limit: '50mb'}));
app.use(urlencoded({limit: '50mb',extended: true}));
app.use(morgan('dev'));
app.use(express.static('public'))
app.use(cors());

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use('/', userLogin)
app.listen(PORT, ()=>console.log("Running server on port:http://localhost:${PORT}"));
