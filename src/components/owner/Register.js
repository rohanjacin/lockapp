import Web3  from 'web3';
import { useState, useEffect } from 'react';
import {Owner, LockContract, OwnerIdentity, OwnerGroup, OwnerGroupInfo} from "./Connect";
import { generateProof } from '@semaphore-protocol/proof';

var BasePriceSet = false;

function Register () {
	const [basePrice, setBasePrice] = useState('');

	async function registerRoom () {
		let ipfsHash = 'dummy';

		let message = "hello";
		let scope = OwnerGroup.root;
		const proof = await generateProof(OwnerIdentity, OwnerGroup, message, scope);

		await LockContract.methods.registerOwner(basePrice, ipfsHash, OwnerGroupInfo.root, proof).
							send({from: Owner, gas: 1000000});
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
			&nbsp; for room
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