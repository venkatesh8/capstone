const express = require('express');
const cors = require('cors');
const dbConfig = require('./app/config/db.config');
const log = require('./app/utils/logger')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:4200',
};

app.use(cors(corsOptions));

const db = require('./app/models');

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    log.debugLog.debug('[DB Connection]: Successfully connect to MongoDB. ')
    console.log('Successfully connect to MongoDB.');
    // initial(); un comment if roles needed
  })
  .catch((err) => {
    log.errorLog.error(`[DB Connection]: ${err.message}`)
    console.error('Connection error', err);
    log.errorLog.error(`[DB Connection] Process Exited: ${err}`)
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  log.debugLog.info(`[/]: ${req.url} accessed!.`)
  res.json({ data: {}, success: true, message: `No Content` });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  log.debugLog.info(`[Server Start]: PORT:  ${PORT} !.`)
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: 'user',
//       }).save((err) => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: 'moderator',
//       }).save((err) => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: 'admin',
//       }).save((err) => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
