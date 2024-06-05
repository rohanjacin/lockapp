import { useState, useEffect } from 'react';
import { Connect, WS } from "./components/owner/Connect";
import { Register } from "./components/owner/Register";
import { Approve } from "./components/owner/Approve";
import { Authorize } from "./components/owner/Authorize";
import { Messaging } from "./components/owner/Messaging";
import './App.css';

function AppOwner () {

  // Lock status from nested Connect component
  const lockstatus = {connected: false, contract: ''}; 
  const [locknet, setLockNet] = useState(lockstatus);

  // Guest status and initial Nonce value from nested Approve component
  const gueststatus = {guest: '', nonce: ''}; 
  const [guestnonce, setGuestNonce] = useState(gueststatus);

  // Challenge Response values from nested Approve component
  const challengestatus = {challenge: '', response: '', proof: ''}; 
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
          setGuestNonce({...guestnonce, 'nonce': msg.nonce.data})
        }
        else if (msg.type == 'Response') {
          console.log("Response from server");

          // Update response in Authorize component
          setChallengeResponse({...challengeresponse,
            'response': msg.nonce.data, 'ownerproof': msg.ownerproof})
        } 
      }
  }

  return (
    <div className="App">
      <h1>ZKP Lock Contract App (Owner)</h1>      
      <Connect _setLockNet={setLockNet}
               _locknet={locknet}/>
      <br />
      <Register />
      <br />      
      <Approve _setGuestNonce={setGuestNonce}
               _guestnonce={guestnonce}/>
      <br />      
      <Authorize _setChallengeResponse={setChallengeResponse}
               _challengeresponse={challengeresponse}/>
      <br />
      <Messaging />
    </div>
  )
}

export default AppOwner