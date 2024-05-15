import Web3  from 'web3';
import { useState } from 'react';
import LockABI from '../../lockcontractABI'
import '../../App.css';

// Provider (test network)
const ganache = require('ganache');

// Guest address and state
var Guest;
var Connected = false;
var LockContract;

// Websocket to backend owner logic
var WS;

// Web3 global object 
var web3;

// Connects to the Lock network and backend lock logic
function Connect ({_setLockNet, _locknet}) {
	const ganacheUrl = 'ws://localhost:8545';
	const wsUrl = 'ws://localhost:8547';

	const [address, setAddress] = useState('');

	// Add provider
	const wsProvider = new Web3.providers.WebsocketProvider(ganacheUrl);
	web3 = new Web3(wsProvider);

	// Create the contract instance
	async function createContractInstance () {
		LockContract = new web3.eth.Contract(LockABI.ABI, address);
		const signers = await web3.eth.getAccounts();
		
		Guest = signers[2];
		
		console.log("Connected to Lock network from:" + Guest);
		console.log("Contract address is:" + LockContract._address);
		return true;
	}

	// Create the web socket instance to backend
	async function createWebSocketInstance () {
		WS = new WebSocket(wsUrl); 

		WS.onopen = function () {
			console.log("Socket opened");
		};
		return true;
	}

	return (
		<div className="Connect">
			<h2>Step 1 : Connect to Lock contract</h2>
			Contract address :
			&nbsp; &nbsp;
			<input placeholder="Ethereum address format"
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setAddress(event.target.value)}
				value={address}
			/>
      		<br />
      		<br />
			<button  
				style={{padding:"12px", border:"none"}}
				disabled={Connected}
				onClick={async () => {
					console.log("Pressed");
					let ret1 = await createContractInstance();
					let ret2 = await createWebSocketInstance();
					Connected = ret1 && ret2;
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
export {Guest};
export {LockContract};
export {Connected};
export {WS};
export {web3};