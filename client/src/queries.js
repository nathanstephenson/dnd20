import {gql} from '@apollo/client';

//queries for client, import from here to necessary paths
/* export const getUsers = gql`
  query getAllUsers{
    users {
      name
      username
      password
    }
  }
`; */
/* export const getUser = gql`
  query getUser($username:String, $password:String){
    user(username: $username, password: $password){
      _id
      name
      campaigns{
        _id
        name
        dm
      }
      characters{
        _id
        name
      }
    }
  }
`; */

export const getUserID = gql`
  query getUserID($username:String, $password:String){
    getUserID(username:$username, password:$password)
  }
`;

export const getUserByID = gql`
  query getUserByID($id: String){
    user(id: $id){
      _id
      name
      campaigns{
        _id
        name
        dm
        currentSession
      }
      characters{
        _id
        name
      }
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
        currentSession
      }
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

export const getCharacter = gql`
  query getCharacter($id:String){
    character(id:$id){
      _id
      user
      campaign
      name
      race
      background
      class
      level
      hp
      cha
      con
      dex
      int
      str
      wis
    }
  }
`;

export const addCharacter = gql`
  mutation addCharacter($user:String, $campaign:String, $name:String, $race:String, $background:String){
    addCharacter(user:$user, campaign:$campaign, name:$name, race:$race, background:$background){
      _id
      name
    }
  }
`;

export const updateCharacterInfo = gql`
  mutation updateCharacterInfo($id:String, $name:String, $campaign:String){
    updateCharacterInfo(id:$id, name:$name, campaign:$campaign){
      _id
      name
    }
  }
`;

export const updateCharacterStats = gql`
  mutation updateCharacterStats($id:String, $class:String, $cha:Int, $con:Int, $dex:Int, $int:Int, $str:Int, $wis:Int){
    updateCharacterStats(id:$id, class:$class, cha:$cha, con:$con, dex:$dex, int:$int, str:$str, wis:$wis){
      _id
      campaign
      name
    }
  }
`;

export const deleteCharacter = gql`
  mutation deleteCharacter($user:String, $campaign:String, $character:String){
    deleteCharacter(user:$user, campaign:$campaign, character:$character)
  }
`;

export const getClasses = gql`
  query getClasses{
    classes{
      index
      name
    }
  }
`;

export const getRaces = gql`
  query getRaces{
    races{
      index
      name
      speed
      age
      alignment
      size_description
      language_desc
    }
  }
`;

export const currentSession = gql`
  query currentSession($id:String){
    session(id:$id){
      campaign
      characters{
        _id
        position
        character{
          user
          name
          race
          background
          class
          level
          hp
          cha
          con
          dex
          int
          str
          wis
        }
      }
    }
  }
`;

export const onSessionUpdate = gql`
  subscription onSessionUpdate($id:String){
    sessionUpdate(id:$id){
      campaign
      characters{
        _id
        position
        character{
          user
          name
          race
          background
          class
          level
          hp
          cha
          con
          dex
          int
          str
          wis
        }
      }
    }
  }
`;