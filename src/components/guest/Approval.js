import Web3  from 'web3';
import { useState, useEffect } from 'react';
import {Guest, LockContract, Connected, WS} from "./Connect";
import BN from "bn.js";

// Owner's address and approval state
var OwnerApproved = false;
var Owner = null;

// Initial Nonce to be sent to the lock 
var Nonce = null;

// Owner's approval, send intial nonce  
function Approval ({_setOwnerNonce, _ownernonce}) {
	let [nonce, setNonce] = useState('');

	// When connected listen to contract events
	useEffect(() => {
		if (Connected == true) {
			//console.log("LOCK connected(approve)..");
			listen();
		}
	}, [Connected]);

	// Update initial nonce when received from backend 
	useEffect(() => {
		if (_ownernonce.nonce != '') {
			console.log("nonce updated");
			Nonce = _ownernonce.nonce;
		}
	}, [_ownernonce.nonce]);

	// Register for messages/events from the Lock contract
	function listen () {

		// Owner has approved
		const subscription = LockContract.events.GuestApproved();
		subscription.on("data", async (event) => {
			let data = event.returnValues;
			console.log("Guest:" + data.guest);
			console.log("Owner:" + data.owner);
			console.log("nonce:" + data.nonce);

			Owner = data.owner;
			OwnerApproved = true;

			let _nonce = data.nonce;
			_nonce = _nonce.split("0x");
			_nonce = new BN(_nonce[1], 16).toArray(65);

			Nonce = _nonce;
			nonce = Nonce;
			setNonce(nonce);

			console.log("Request(sent):" + JSON.stringify(Nonce));

			_setOwnerNonce({..._ownernonce, 'owner': Owner, 'nonce': Nonce});

			// Send request to backend (lock)
			let msg = {type: 'Request', nonce: Nonce};
			WS.send(JSON.stringify(msg));	
		});
	}

	return (
		<div className="Approval">
			<h2>Step 3 : Owner Approval</h2>
			Nonce :
			&nbsp; &nbsp;
			<input placeholder={"decimal byte array (65 bytes)" || {nonce}}
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => {
					console.log("ONCHANGE");
					setNonce(event.target.value)
				}}
				value={nonce}
			/>
			&nbsp; (from Owner to Lock via Guest)
		</div>
	)
}

export { Approval };
export { OwnerApproved };
export { Owner };
export { Nonce };