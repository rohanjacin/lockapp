import { useState, useEffect } from 'react';
import { Connect, WS } from "./components/guest/Connect";
import { Request, BidPriceSet } from "./components/guest/Request";
import { Approval, OwnerApproved, Owner, Nonce } 
                                from "./components/guest/Approval";
import { Authorization, Challenge, Response } from "./components/guest/Authorization";
import { Messaging } from "./components/guest/Messaging";

import './App.css';

function AppGuest () {

  // Lock status from nested Connect component
  const lockstatus = {connected: false, contract: ''}; 
  const [locknet, setLockNet] = useState(lockstatus);

  // Guest status and initial Nonce value from nested Approve component
  const ownerstatus = {owner: '', nonce: ''}; 
  const [ownernonce, setGuestNonce] = useState(ownerstatus);

  // Base bid price (owner) from nested Request component
  const basebidstatus = {bbid: ''}; 
  const [basebid, setBaseBid] = useState(basebidstatus);

  // Challenge Response values from nested Authorization component
  const challengestatus = {challenge: '', response: '',
               status: '', pin: '', shared_key: '', shared_msg_key: ''};
  const [challengeresponse, setChallengeResponse] = useState(challengestatus);

  // Lock connected to network handler 
  useEffect(() => {
    console.log("LOCK contract updated..");
    if (locknet.connected == true) {
      console.log("LOCK connected..");
      listenServerEvents();
    }
  }, [lockstatus]);

  // Base bid updated 
  useEffect(() => {
    if (locknet.connected == true) {
     if (basebidstatus.bbid != '') {
        console.log("Base Bid updated..");
     }
    }
  }, [basebidstatus]);

  // Owner added and Nonce updated handler 
  useEffect(() => {
     console.log("Owner/Nonce updated..");
     if (ownernonce.owner != '') {
        console.log("Owner attached..");
     }
     if (ownernonce.nonce != '') {
        console.log("Nonce arrived..");
     }     
  }, [ownerstatus]);

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
        //console.log('Message from lock', event.data);
        let msg = JSON.parse(event.data);

        if (msg.type == 'Challenge') {
          console.log("Challenge from lock");

          // Update challenge in Authorization component
          setChallengeResponse({...challengeresponse, 'challenge': msg.nonce.data})
        }
        else if (msg.type == 'Ack') {
          console.log("Ack from lock");

          // Update result in Authorization component
          setChallengeResponse({...challengeresponse,
            'status': msg.match, 'pin': msg.pin,
            'shared_key': msg.shared_key.data,
            'shared_msg_key': msg.shared_msg_key.data});
        }
      }
  }

  return (
    <div className="App">
      <h1>ZKP Lock Contract App (Guest)</h1>
      <Connect _setLockNet={setLockNet}
               _locknet={locknet}/>
      <br />               
      <Request _setBasebid={setBaseBid}
               _basebid={basebid}/>
      <br />
      <Approval _setOwnerNonce={setGuestNonce}
               _ownernonce={ownernonce}/>
      <br />
      <Authorization _setChallengeResponse={setChallengeResponse}
               _challengeresponse={challengeresponse}/>
      <br />
      <Messaging />
    </div>
  )
}

export default AppGuest