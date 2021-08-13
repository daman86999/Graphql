const mongoose = require('mongoose');

const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const { createServer } = require('http');

const schema = require('./schema/schema');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

const server = new ApolloServer({
  schema,
  playground: {
    endpoint: 'http://localhost:4000/graphql',
  },
  subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
  },
});

server.applyMiddleware({ app });

const httpServer = createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(
    `Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
  );
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@dblibrary.trbnb.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB Connected');
});

mongoose.connection.on('error', () => {
  console.error.bind(console, 'connection error:');
});
