const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const users = [
  {
    id: 1,
    name: 'Brian',
    age: '21',
    location: 'Lahore',
    jobs: {
      company: 'Invozone',
      duration: '1 Year',
    },
  },
  {
    id: 2,
    name: 'Kim',
    age: '22',
    location: 'Lahore',
    jobs: {
      company: 'Ranglerz',
      duration: '3 Years',
    },
  },
  {
    id: 3,
    name: 'Faith',
    age: '20',
    location: 'Lahore',
    jobs: {
      company: 'Freelancing',
      duration: '2 Years',
    },
  },
  {
    id: 4,
    name: 'Joseph',
    age: '23',
    location: 'Lahore',
    jobs: {
      company: 'N/A',
      duration: 'N/A',
    },
  },
  {
    id: 5,
    name: 'Joy',
    age: '25',
    location: 'Lahore',
    jobs: {
      company: 'Test',
      duration: '10 Year',
    },
  },
];

const getUser = (args) => {
  const userID = args.id;
  return users.filter((user) => user.id === userID)[0];
};

const getAllUsers = () => users;

const mySchema = buildSchema(`
  type Query {
    user(id: Int): Person,
    users(name: String): [Person]
  },

  type Person {
    id: Int
    name: String
    age: Int
    location: String
    jobs: Experience
  },

  type Experience {
      company: String
      duration: String
  }
`);

const root = {
  user: getUser,
  users: getAllUsers,
};

const app = express();
app.use(cors());
app.options('*', cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: mySchema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
