import Web3  from 'web3';
import { useState, useEffect } from 'react';
import { Guest, LockContract, Connected } from "./Connect";

var BidPriceSet = false;

function Request () {
	const [bidPrice, setBidPrice] = useState('');
	let [owner, setOwner] = useState('');

	// When connected listen to contract events
	useEffect(() => {
		if (Connected == true) {
			listen();
		}
	}, [Connected]);


	// Register for messages/events from the Lock contract
	function listen () {
		// Owner has approved
		const subscription = LockContract.events.BidRoomNow();
		subscription.on("data", async (event) => {
			let data = event.returnValues;
			console.log("bidowner:" +  data.owner);
			console.log("price:" +  data.price);
			owner = data.owner;
			setOwner(owner);
		});
	}

	async function requestRoom () {
		let price = 110;

		await LockContract.methods.registerGuest().send(
				{from: Guest, value: price, gas: 1000000});
		console.log("registerGuest");
	}

	return(
		<div className="Request">
			<h2>Step 2 : Request Room</h2>
			Owner :
			&nbsp; &nbsp;
			<input placeholder={"Ethereum address format" || {owner}}
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setOwner(event.target.value)}
				value={owner}
			/>			
			<br />
			<br />
			Bid Price :
			&nbsp; &nbsp;			
			<input placeholder="gwei"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setBidPrice(event.target.value)}
				value={bidPrice}
			/>
			<br />
			<br />
			<button
				style={{padding:"12px", border:"none"}}			
				disabled={BidPriceSet}
				onClick={async () => {
					console.log("BPressed");
					await requestRoom();
					if (BidPriceSet) {
						//_setLockNet({..._locknet,
						//	'contract': lockContract, 'connected': true});
					}
				}}
			>
				Set Bid
			</button>
		</div>
	)
}

export { Request };
export { BidPriceSet };