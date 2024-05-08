import { useState, useEffect } from 'react';
import {Connect} from "./components/Connect";
import Register from "./components/Register";
import Approve from "./components/Approve";
import './App.css';

function App () {
  const lockstatus = {connected: false, contract: ''}; 
  const [locknet, setLockNet] = useState(lockstatus);

  useEffect(() => {
     console.log("LOCK contract updated..");
     if (locknet.connected == true) {
      console.log("LOCK connected..");
    }
  }, [lockstatus]);

  return (
    <div className="App">
      <h1>ZKP Lock Contract App (Owner)</h1>
      <Connect _setLockNet={setLockNet}
               _locknet={locknet}/>
      <Register />
      <Approve />
    </div>
  )
}

///*<input
//  type="text"
//  onChange={(event) => setName(event.target.value)}
//  value={name}
///>
//<button onClick={deploy}>Deploy</button>
//*/
export default App