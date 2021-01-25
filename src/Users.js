import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_SINGLE_USER = gql`
  query($userid: Int!) {
    user(id: $userid) {
      id
      name
      age
      jobs {
        company
        duration
      }
    }
  }
`;
const GET_USERS = gql`
  {
    users {
      id
      name
      age
      jobs {
        company
        duration
      }
    }
  }
`;
function Users(user) {
  const { loading, error, data } =
    user.id !== undefined && user.id !== ''
      ? useQuery(GET_SINGLE_USER, { variables: { userid: parseInt(user.id, 10) } })
      : useQuery(GET_USERS);
  if (loading) {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }
  if (error) {
    return (
      <tr>
        <td colSpan="5">
          Error :(
          {error.message}
        </td>
      </tr>
    );
  }
  if (data.user) {
    return (
      <tr key={data.user.id}>
        <td>{data.user.id}</td>
        <td>{data.user.name}</td>
        <td>{data.user.age}</td>
        <td>{data.user.jobs.company}</td>
        <td>{data.user.jobs.duration}</td>
      </tr>
    );
  }
  if (data.users) {
    const usersList = [];
    data.users.forEach((u) => {
      usersList.push(
        <tr key={u.id}>
          <td>{u.id}</td>
          <td>{u.name}</td>
          <td>{u.age}</td>
          <td>{u.jobs.company}</td>
          <td>{u.jobs.duration}</td>
        </tr>,
      );
    });
    return usersList;
  }
  if (!data.user && !data.users) {
    return (
      <tr>
        <td colSpan="5">No user found for this ID </td>
      </tr>
    );
  }
}
export default Users;
