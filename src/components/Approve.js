import Web3  from 'web3';
import { useState, useEffect } from 'react';
import {Owner, LockContract} from "./Connect";

var GuestApproved = false;
var Guest = '';
var Nonce = '';

function Approve () {
	const [guest, setGuest] = useState('');
	const [nonce, setNonce] = useState('');

	function listen () {
		//const subscription = LockContract.events.GuestRegistered();
		//subscription.on("data", () => {
			//console.log("Guest" + data.guest);
			//Guest = data.guest;	
		//});
	}

	listen();

	return (
		<div className="Approve">
			<h2>Step 3 : Register Room</h2>
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
				onChange={(event) => setNonce(event.target.value)}
				value={nonce}
			/>
			&nbsp; &nbsp;
			<button
				disabled={GuestApproved}
				onClick={async () => {
					console.log("GPressed");
					//await registerRoom();
					//if (GuestApproved) {
						//_setLockNet({..._locknet,
						//	'contract': lockContract, 'connected': true});
					//}
				}}
			>
				"Approve Guest"
			</button>
		</div>
	)
}

export default Approve;