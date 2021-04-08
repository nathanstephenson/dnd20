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
      _id
      name
      campaigns{
        _id
        name
        dm
      }
    }
  }
`;
export const getUserByID = gql`
  query getUserByID($_id: String){
    userByID(_id: $_id){
      name
      permissions
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

export const getCampaignID = gql`
  query getCampaignID($name:String){
    campaign(name:$name){
      _id
    }
  }
`;


export const getCampaign = gql`
  query getCampaign($id:String){
    campaign(id:$id){
      name
      dm
    }
  }
`;

export const addCampaign = gql`
  mutation addCampaign($dm:String, $name:String){
    addCampaign(dm:$dm, name:$name){
      _id
    }
  }
`;

export const deleteCampaign = gql`
  mutation deleteCampaign($user:String, $dm:String, $campaign:String){
    deleteCampaign(user:$user, dm:$dm, campaign:$campaign)
  }
`;

export const renameCampaign = gql`
  mutation renameCampaign($id:String, $name:String){
    renameCampaign(id:$id, name:$name){
      name
    }
  }
`;

export const currentUser = gql`
  subscription currentUser($id:String){
    updateUser(id:$id){
      _id
      name
      permissions
      campaigns{
        _id
        name
        dm
      }
    }
  }
`;