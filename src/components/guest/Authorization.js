import { useState, useEffect } from 'react';
import { Guest, LockContract, Connected, WS, web3 } from "./Connect";
import { Owner, Nonce, OwnerApproved, Approval } from "./Approval";
import BN from "bn.js";

// Challenge and Response values
var Challenge = null;
var Response = null;

// Request authorization from owner following which push the challenge
// to the lock and accept the response to be sent to the owner 
function Authorization ({_setChallengeResponse, _challengeresponse}) {
	let [challenge, setChallenge] = useState('');
	let [response, setResponse] = useState('');
	let [offchainsecret, setOffChainSecret] = useState('');

	// When connected listen to contract events
	useEffect(() => {
		if (Connected == true) {
			//console.log("LOCK connected(authorization)..");
			listen();
		}
	}, [Connected]);

	// Update challenge when received from lock 
	useEffect(() => {
		if (_challengeresponse.challenge != '') {
			console.log("challenge updated");
			Challenge = _challengeresponse.challenge;
			challenge = Challenge;
			setChallenge(challenge);
		}
	}, [_challengeresponse.challenge]);

	// Update response when received from backend (owner)
	useEffect(() => {
		if (_challengeresponse.response != '') {
			console.log("response updated");
			Response = _challengeresponse.response;
		}
	}, [_challengeresponse.response]);

	// Register for messages/events from the Lock contract
	function listen () {

		// Owner has responded to authentication
		const subscription = LockContract.events.RespondAuth();
		subscription.on("data", async (event) => {
			let data = event.returnValues;
			console.log("Guest:" + data.guest);
			console.log("Owner:" + data.owner);
			console.log("Owner verified?:" + data.isOwnerVerified);
			console.log("Response:" + JSON.stringify(data.ctx.ownernonce));

			let ownernonce = data.ctx.ownernonce;
			let nonce0 = ownernonce[0].split("0x");
			let nonce1 = ownernonce[1].split("0x");
			let seed = ownernonce[2].split("0x");
			let counter = ownernonce[3].split("0x");
			let hmac = ownernonce[4].split("0x");

			nonce0 = new BN(nonce0[1], 16).toArray(65);
			nonce1 = new BN(nonce1[1], 16).toArray(32);
			seed = new BN(seed[1], 16).toArray(65);
			counter = new BN(counter[1], 16).toArray(1);
			hmac = new BN(hmac[1], 16).toArray(32);

			let respnonce = new Array(65 + 32 + 65 + 1 + 32);
			respnonce = [...nonce0, ...nonce1, ...seed, ...counter, ...hmac];
			console.log("Response is:" + JSON.stringify(respnonce));
			Response = respnonce;
			response = Response;
			setResponse(response);
		
			// Send response to lock
			let msg = {type: 'Response', nonce: respnonce};
			WS.send(JSON.stringify(msg));
		});
	}

	// Request Authorization 
	async function requestAuth(nonce) {
		console.log("Guest:" + Guest);
		console.log("Owner:" + Owner);
		console.log("Challenge:" + nonce);

		let nonce0 = Uint8Array.from(nonce.slice(0, 65));
		let nonce1 = Uint8Array.from(nonce.slice(65, 97));
		let seed = Uint8Array.from(nonce.slice(97, 162));
		let counter = Uint8Array.from(nonce.slice(162, 163));
		let hmac = Uint8Array.from(nonce.slice(163, 195));
		const __challenge = {nonce0, nonce1, seed, counter, hmac};

		// Create proof here : TDB
		await LockContract.methods.reqAuth(__challenge).send({from: Guest, gas: 1000000});
	}

	return (
		<div className="Authorize">
			<h2>Step 4 : Request Authorization</h2>
			Challenge :
			&nbsp; &nbsp;
			<input placeholder={"decimal byte array (195 bytes)" || {challenge}}
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setChallenge(event.target.value)}
				value={challenge}
			/>
			&nbsp; (from Lock to Owner via Guest)
			<br />
			<br />
			Off-chain secret :
			&nbsp; &nbsp;			
			<input placeholder={"hexadecimal string" || {offchainsecret}}
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => {
					setOffChainSecret(event.target.value)
				}}
				value={offchainsecret}
			/>
			&nbsp; (from Owner to Guest)
			<br />
			<br />
			Response :
			&nbsp; &nbsp;			
			<input placeholder="decimal byte array (195 bytes)"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setResponse(event.target.value)}
				value={response}
			/>
			&nbsp; (from Owner to Lock via Guest)						
			&nbsp; &nbsp;
			<br />
			<br />			
			<button
				style={{padding:"12px", border:"none"}}			
				disabled={!OwnerApproved}
				onClick={async () => {
					console.log("ZPressed");
					//_setChallengeResponse({..._challengeresponse, 'response': Response});
					requestAuth(Challenge);
				}}
			>
				Request Authorization
			</button>
		</div>
	)
}

export { Authorization };
export { Challenge };
export { Response };