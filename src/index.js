import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import User from './Users';
import './style.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});
function App() {
  const [data, setValue] = useState('');

  const myStyle = {
    padding: 5,
    borderRadius: 5,
  };
  const tableStyle = {
    width: '100%',
  };
  const inputDiv = {
    margin: '40px auto',
    width: '20%',
  };

  useEffect(() => {}, [data]);

  return (
    <div>
      <div style={inputDiv}>
        <label htmlFor="userId">User ID: </label>
        <input
          style={myStyle}
          type="number"
          id="userId"
          placeholder="Please enter User ID"
          value={data}
          onChange={(val) => {
            setValue(val.target.value);
          }}
        />
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Company</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          <User id={data} />
        </tbody>
      </table>
    </div>
  );
}

const ApolloApp = (AppComponent) => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
