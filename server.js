//12.4.6
//12.5.6

const express = require("express");
const db = require('./db/connection');
//defaults to index.js (vs typing ./routes/apiRoutes/index.js)
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//By adding the /api prefix here, we can remove it from
   //the individual route expressions after we move them
app.use('/api', apiRoutes);


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
  