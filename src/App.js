import { useState, useEffect } from 'react';
import { Connect, WS } from "./components/Connect";
import Register from "./components/Register";
import { Approve,  } from "./components/Approve";
import './App.css';
import JSONBigNumber from 'json-bignumber';

function App () {
  const lockstatus = {connected: false, contract: ''}; 
  const [locknet, setLockNet] = useState(lockstatus);

  const gueststatus = {guest: '', nonce: ''}; 
  const [guestnonce, setGuestNonce] = useState(gueststatus);

/*  const _cb_setGuestNonce = useCallback((x) => {
    setGuestNonce(x);
  }, [guestnonce]);
*/
  useEffect(() => {
     console.log("LOCK contract updated..");
     if (locknet.connected == true) {
      console.log("LOCK connected..");
      listenServerEvents();
    }
  }, [lockstatus]);

  useEffect(() => {
     console.log("Guest/Nonce updated..");
     if (guestnonce.guest != '') {
        console.log("Guest added..");
     }
  }, [gueststatus]);

  function listenServerEvents () {

      WS.onmessage = function (event) {
        console.log('Message from server', event.data);
        let msg = JSON.parse(event.data);

        if (msg.type == 'Request') {
          console.log("Nonce from server");
          setGuestNonce({...guestnonce, 'nonce': msg.nonce0})
        }
      }
  }

  return (
    <div className="App">
      <h1>ZKP Lock Contract App (Owner)</h1>
      <Connect _setLockNet={setLockNet}
               _locknet={locknet}/>
      <Register />
      <Approve _setGuestNonce={setGuestNonce}
               _guestnonce={guestnonce}/>
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