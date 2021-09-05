
const mongoose = require('mongoose');
const app = require('./src/app')

require('dotenv').config();

const port = process.env.PORT || 8080;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});