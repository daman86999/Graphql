const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dblibrary.trbnb.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
const app = express();
app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose.connection.once('open', () => {
  console.log('DB Connected');
});

mongoose.connection.on('error', () => {
  console.error.bind(console, 'connection error:');
});

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
