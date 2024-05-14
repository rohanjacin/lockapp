import { useState, useEffect } from 'react';
import { Connect, WS } from "./components/Connect";
import { Register } from "./components/Register";
import { Approve } from "./components/Approve";
import { Authorize } from "./components/Authorize";
import './App.css';

function App () {

  // Lock status from nested Connect component
  const lockstatus = {connected: false, contract: ''}; 
  const [locknet, setLockNet] = useState(lockstatus);

  // Guest status and initial Nonce value from nested Approve component
  const gueststatus = {guest: '', nonce: ''}; 
  const [guestnonce, setGuestNonce] = useState(gueststatus);

  // Challenge Response values from nested Approve component
  const challengestatus = {challenge: '', response: ''}; 
  const [challengeresponse, setChallengeResponse] = useState(challengestatus);

  // Lock connected to network handler 
  useEffect(() => {
    console.log("LOCK contract updated..");
    if (locknet.connected == true) {
      console.log("LOCK connected..");
      listenServerEvents();
    }
  }, [lockstatus]);

  // Guest added handler 
  useEffect(() => {
     console.log("Guest/Nonce updated..");
     if (guestnonce.guest != '') {
        //console.log("Guest added..");
     }
  }, [gueststatus]);

  // Challenge updated handler 
  useEffect(() => {
     console.log("Challenge/Response updated..");
     if (challengeresponse.challenge != '') {
        //console.log("Challenge arrived..");
     }
  }, [challengestatus]);

  // Listen to messages from backend owner logic via websocket 
  function listenServerEvents () {

      WS.onmessage = function (event) {
        //console.log('Message from server', event.data);
        let msg = JSON.parse(event.data);

        if (msg.type == 'Request') {
          console.log("Nonce from server");

          // Update nonce in Approve component
          setGuestNonce({...guestnonce, 'nonce': msg.nonce0.data})
        }
        else if (msg.type == 'Response') {
          console.log("Response from server");

          // Update response in Authorize component
          setChallengeResponse({...challengeresponse, 'response': msg.nonce.data})
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
      <Authorize _setChallengeResponse={setChallengeResponse}
               _challengeresponse={challengeresponse}/>
    </div>
  )
}

export default App