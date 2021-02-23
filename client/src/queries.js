import {gql} from '@apollo/client';

//queries for client, import from here to necessary paths
export const getUsers = gql`
  query getAllUsers{
    users {
      name
      username
      password
    }
  }
`;
export const getUser = gql`
  query getUser($username:String, $password:String){
    user(username: $username, password: $password){
      name
      username
      password
    }
  }
`;

export const addUser = gql`
  mutation addUser($name:String, $username:String, $password:String){
    addUser(name:$name, username:$username, password:$password){
      name
    }
  }
`;