import { useState, useEffect } from 'react';
import { Owner, LockContract, Connected, WS, web3 } from "./Connect";
import { Guest, Nonce, GuestApproved } from "./Approve";
import Spinner from 'react-bootstrap/Spinner';

import BN from "bn.js";

// Challenge and Response values
var Challenge = null;
var Response = null;
var OwnerProof = null;

// Attempt to authorize guest by pushing the challenge to backend 
// and forwarding the response from the backend to the lock 
function Authorize ({_setChallengeResponse, _challengeresponse}) {
	let [challenge, setChallenge] = useState('');
	let [response, setResponse] = useState('');
	let [ownerproof, setOwnerproof] = useState('');

	// When connected listen to contract events
	useEffect(() => {
		if (Connected == true) {
			//console.log("LOCK connected(authorize)..");
			listen();
		}
	}, [Connected]);

	// Update challenge when received from lock 
	useEffect(() => {
		if (_challengeresponse.challenge != '') {
			console.log("challenge updated");
			Challenge = _challengeresponse.challenge;
			//approveGuest(Guest, Nonce);
		}
	}, [_challengeresponse.challenge]);

	// Update response when received from backend (owner)
	useEffect(() => {
		if (_challengeresponse.response != '') {
			console.log("response updated");
			Response = _challengeresponse.response;
			response = Response;
			setResponse(response);
			OwnerProof = _challengeresponse.ownerproof;
			ownerproof = OwnerProof;
			setOwnerproof(ownerproof);
			//approveGuest(Guest, Nonce);
		}
	}, [_challengeresponse.response]);

	// Register for messages/events from the Lock contract
	function listen () {

		// Guest has requested authentication
		const subscription = LockContract.events.RequestAuth();
		subscription.on("data", async (event) => {
			let data = event.returnValues;
			console.log("Guest:" + data.guest);
			console.log("Owner:" + data.owner);
			console.log("Challenge:" + JSON.stringify(data.ctx.locknonce));

			//Challenge = data.ctx.locknonce;
			_setChallengeResponse({..._challengeresponse, 'challenge': data.ctx.locknonce});
			
			// Send request to server handshake
			let locknonce = data.ctx.locknonce;
			let _nonce0 = locknonce[0].split("0x");
			let _nonce1 = locknonce[1].split("0x");
			let _seed = locknonce[2].split("0x");
			let _counter = locknonce[3].split("0x");
			let _hmac = locknonce[4].split("0x");

			let nonce0 = new BN(_nonce0[1], 16).toArray(65);
			let nonce1 = new BN(_nonce1[1], 16).toArray(32);
			let seed = new BN(_seed[1], 16).toArray(65);
			let counter = new BN(_counter[1], 16).toArray(1);
			let hmac = new BN(_hmac[1], 16).toArray(32);

			let lock_nounce = new Array(65 + 32 + 65 + 1 + 32);
			lock_nounce = [...nonce0, ...nonce1, ...seed, ...counter, ...hmac];
			console.log("Challenge(sent):" + JSON.stringify(lock_nounce));
			Challenge = lock_nounce; 
			challenge = Challenge;
			setChallenge(challenge);

			// Send challenge to backend
			let msg = {type: 'Challenge', nonce: lock_nounce};
			WS.send(JSON.stringify(msg));	
		});
	}

	// Authorize Guest 
	async function authorizeGuest(guest) {
		console.log("Guest:" + Guest);
		console.log("Owner:" + Owner);
		console.log("Response:" + Response);

		let nonce = Response;

		let nonce0 = Uint8Array.from(nonce.slice(0, 65));
		let nonce1 = Uint8Array.from(nonce.slice(65, 97));
		let seed = Uint8Array.from(nonce.slice(97, 162));
		let counter = Uint8Array.from(nonce.slice(162, 163));
		let hmac = Uint8Array.from(nonce.slice(163, 195));
		const rspnonce = {nonce0, nonce1, seed, counter, hmac};

		ownerproof = "Loading...";
		setOwnerproof(ownerproof);
		// Create proof here : TDB
		let p = OwnerProof;
		console.log("P:" + p);
		await LockContract.methods.responseAuth(Guest, rspnonce,
			p.proof[0], p.proof[1], p.proof[2], p.publicSignals).send({from: Owner, gas: 1000000});
	}

	return (
		<div className="Authorize">
			<h2>Step 4 : Authorize Guest</h2>
			Challenge :
			&nbsp; &nbsp;
			<input placeholder="decimal byte array (195 bytes)"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setChallenge(event.target.value)}
				value={challenge}
			/>
			&nbsp; (from Lock to Owner)
			<br />
			<br />
			Response :
			&nbsp; &nbsp;
			<input placeholder="decimal byte array (195 bytes)"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => {
					console.log("ONCHANGE REesponse");
					setResponse(event.target.value)
				}}
				value={response}
			/>
			&nbsp; (from Owner to Lock)
			<br />
			<br />
			Owner Proof :
			&nbsp; &nbsp;			
			<input placeholder={"groth16 proof format (A, B, C)" || {ownerproof} }
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => {
					console.log("ONCHANGE REesponse");
					setOwnerproof(event.target.value)
				}}
				value={ownerproof}
			/>
			&nbsp; (from Owner to Lock contract)			
			<br />
			<br />									
			<button
				style={{padding:"12px", border:"none"}}			
				disabled={!Connected}
				onClick={async () => {
					console.log("APressed");
					_setChallengeResponse({..._challengeresponse, 'response': Response});
					authorizeGuest(Guest);
				}}
			>
				Authorize Guest
			</button>
		</div>
	)
}

export { Authorize };
export { Challenge };
export { Response };