import Web3  from 'web3';
import { useState, useEffect } from 'react';
import {Owner, LockContract, Connected, WS} from "./Connect";
import { Buffer } from 'buffer';

var GuestApproved = false;
var Guest = null;
var Nonce = null;

function Approve ({_setGuestNonce, _guestnonce}) {
	const [guest, setGuest] = useState('');
	const [nonce, setNonce] = useState('');

	useEffect(() => {
	 console.log("LOCK contract updated..");
	 if (Connected == true) {
	  console.log("LOCK connected(approve)..");
	  listen();
	 }
	}, [Connected]);

	useEffect(() => {
		console.log("Nonce0 updated:" + Nonce);
		if (_guestnonce.nonce != '') {
			console.log("_guestnonce.nonce updated");
			Nonce = _guestnonce.nonce;
			approveGuest(Guest, Nonce);
		}
	}, [nonce, _guestnonce.nonce]);

	function listen () {
		const subscription = LockContract.events.GuestRegistered();
		subscription.on("data", async (event) => {
			let data = event.returnValues;
			console.log("Guest:" + data.guest);
			console.log("Owner:" + data.owner);

			Guest = data.guest;
			_setGuestNonce({..._guestnonce, 'guest': Guest});
			// Send request to server handshake
			let msg = {type: 'Request'};
			WS.send(JSON.stringify(msg));	
		});
	}

	async function approveGuest(guest, nonce) {
		console.log("in approveGuest");
		console.log("Guest:" + Guest);
		console.log("Nonce:" + Nonce);
		console.log("Nonce(typeof):" + typeof(Nonce));

		let _nonce0 = Buffer.from(Nonce);
		//let _nonce0 = new Uint8Array();
		console.log("_nonce0:" + typeof(_nonce0));

		await LockContract.methods.approveGuest(Guest, _nonce0).send({from: Owner, gas: 1000000});		
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