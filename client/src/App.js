import React, { useState } from 'react';
import './App.css';
import Main from './components/Main.js';
import Login from './pages/Login';

function App(){
    
    const [userID, setUserID] = useState(null)

    return (
        <div className="App">
            {userID ? <Main id={userID}/> : <Login handleLogin={setUserID}/>}
        </div>
    );
}

export default App;
