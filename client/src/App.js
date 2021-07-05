import React, { useState } from 'react';
import './App.css';
import Main from './components/main/Main.js';
import Login from './pages/Login';

function App(){
    
    const [userID, setUserID] = useState(null)
    //add function to save ID/token to local storage here
    return (
        <div className="App">
            {userID ? <Main id={userID}/> : <Login handleLogin={setUserID}/>}
        </div>
    );
}

export default App;
