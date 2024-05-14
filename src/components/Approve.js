import Web3  from 'web3';
import { useState, useEffect } from 'react';
import {Owner, LockContract, Connected, WS} from "./Connect";

// Guest address and state
var GuestApproved = false;
var Guest = null;

// Initial Nonce to be sent to the lock 
var Nonce = null;

// Accept addition of guest and approve, 
// send intial nonce  
function Approve ({_setGuestNonce, _guestnonce}) {
	const [guest, setGuest] = useState('');
	const [nonce, setNonce] = useState('');

	// When connected listen to contract events
	useEffect(() => {
		if (Connected == true) {
			//console.log("LOCK connected(approve)..");
			listen();
		}
	}, [Connected]);

	// Update initial nonce when received from backend 
	useEffect(() => {
		if (_guestnonce.nonce != '') {
			console.log("nonce updated");
			Nonce = _guestnonce.nonce;
			//approveGuest(Guest, Nonce);
		}
	}, [nonce, _guestnonce.nonce]);

	// Register for messages/events from the Lock contract
	function listen () {

		// Guest has registered
		const subscription = LockContract.events.GuestRegistered();
		subscription.on("data", async (event) => {
			let data = event.returnValues;
			console.log("Guest:" + data.guest);
			console.log("Owner:" + data.owner);

			Guest = data.guest;
			_setGuestNonce({..._guestnonce, 'guest': Guest});

			// Send request to backend
			let msg = {type: 'Request'};
			WS.send(JSON.stringify(msg));	
		});
	}

	// Approve Guest 
	async function approveGuest(guest, nonce) {
		console.log("Guest:" + Guest);
		console.log("Nonce:" + Nonce);

		await LockContract.methods.approveGuest(Guest, Nonce).send({from: Owner, gas: 1000000});		
	}

	return (
		<div className="Approve">
			<h2>Step 3 : Approve Guest</h2>
			<input placeholder="Guest:"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setGuest(event.target.value)}
				value={guest}
			/>
			<br />
			<input placeholder="Nonce (from Owner to Lock)"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => {
					console.log("ONCHANGE");
					setNonce(event.target.value)
				}}
				value={nonce}
			/>
			&nbsp; &nbsp;
			<button
				disabled={!Connected}
				onClick={async () => {
					console.log("GPressed");
					_setGuestNonce({..._guestnonce, 'guest': Guest});
					approveGuest(Guest);
				}}
			>
				"Approve Guest"
			</button>
		</div>
	)
}

export { Approve };
export { GuestApproved };
export { Guest };
export { Nonce };