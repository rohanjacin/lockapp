import Web3  from 'web3';
import { useState, useEffect } from 'react';
import {Owner, LockContract} from "./Connect";

var BasePriceSet = false;

function Register () {
	const [basePrice, setBasePrice] = useState('');

	async function registerRoom () {
		let ipfsHash = 'dummy';

		await LockContract.methods.registerOwner(basePrice, ipfsHash).send({from: Owner, gas: 1000000});
		console.log("registerRoom");
	}

	return(
		<div className="Register">
			<h2>Step 2 : Register Room</h2>
			Bid base price :
			&nbsp; &nbsp;			
			<input placeholder="gwei"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setBasePrice(event.target.value)}
				value={basePrice}
			/>
			<br />
			<br />
			<button
				style={{padding:"12px", border:"none"}}			
				disabled={BasePriceSet}
				onClick={async () => {
					console.log("BPressed");
					await registerRoom();
					if (BasePriceSet) {
						//_setLockNet({..._locknet,
						//	'contract': lockContract, 'connected': true});
					}
				}}
			>
				Set Base Price
			</button>
		</div>
	)
}

export { Register };