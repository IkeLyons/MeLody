import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pg from 'pg';
import userLogin from './routes/login.js';
import spotifyLogin from './routes/spotifyRoutes.js';
import playlist from './routes/playlist.js';

const PORT = 4000;

const app = express();

app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());

// CORS settings
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//Custom routes
app.use('/', userLogin);
app.use('/', spotifyLogin);
app.use('/playlist', playlist);

app.listen(PORT, () =>
  console.log('Running server at http://localhost:' + PORT)
);
