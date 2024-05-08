import Web3  from 'web3';
import { useState } from 'react';
import LockABI from '../lockcontractABI'
import '../App.css';

// Provider
const ganache = require('ganache');

// Owner's address
var Owner;
var Connected = false;
var LockContract;

function Connect ({_setLockNet, _locknet}) {
	const ganacheUrl = 'ws://localhost:8545';
	const [address, setAddress] = useState('');

	const wsProvider = new Web3.providers.WebsocketProvider(ganacheUrl);
	const web3 = new Web3(wsProvider);

	async function createContractInstance () {
		LockContract = new web3.eth.Contract(LockABI.ABI, address);
		const signers = await web3.eth.getAccounts();
		
		Owner = signers[1];
		Connected = true;

		console.log("Connected to Lock network from:" + Owner);
		console.log("Contract address is:" + LockContract._address);
	}

	return (
		<div className="Connect">
			<h2>Step 1 : Connect to Lock contract</h2>
			<input placeholder="Enter Lock contract address"
				style={{height:"42px", width:"690px"}}
				type="text"
				onChange={(event) => setAddress(event.target.value)}
				value={address}
			/>
			&nbsp; &nbsp;
			<button
				disabled={Connected}
				onClick={async () => {
					console.log("Pressed");
					await createContractInstance();
					if (Connected) {
						_setLockNet({..._locknet,
							'contract': LockContract, 'connected': true});
					}
				}}
			>
				Connect
			</button>
		</div>
	);
}

export {Connect};
export {Owner};
export {LockContract};
export {Connected};