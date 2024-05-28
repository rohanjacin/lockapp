import Web3  from 'web3';
import { useState, useEffect } from 'react';
import { Identity } from '@semaphore-protocol/identity';
import { Group } from '@semaphore-protocol/group';
import LockABI from '../../lockcontractABI'
import '../../App.css';

// Provider (ganache or metamask)
const PROVIDER = process.env.REACT_APP_provider;
const SIGNER_INDEX = process.env.REACT_APP_signer_index;
const ganache = require('ganache');

// Owner's address and state
var Owner;
var Connected = false;
var LockContract;
var OwnerIdentity;
var OwnerGroup;
var OwnerGroupInfo;

// Websocket to backend owner logic
var WS;

// Web3 global object 
var web3;

// Connects to the Lock network and backend owner logic
function Connect ({_setLockNet, _locknet}) {
	const ganacheUrl = 'ws://localhost:8545';
	const wsUrl = 'ws://localhost:8546';

	const [address, setAddress] = useState('');
	let [owner, setOwner] = useState('');

	useEffect(() => {
		if (Connected == true) {
			owner = Owner;
			setOwner(owner);
		}
	}, [Owner]);

	// Create the contract instance
	async function createContractInstance () {
		LockContract = new web3.eth.Contract(LockABI.ABI, address);
		const signers = await web3.eth.getAccounts();

		let idx = (PROVIDER == "ganache") ? SIGNER_INDEX : 0;		
		Owner = signers[idx];
		
		console.log("Connected to Lock network from:" + Owner);
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

	async function createProvider () {

		if (PROVIDER == "ganache") {
			// Add provider (ganache)
			const wsProvider = new Web3.providers.WebsocketProvider(ganacheUrl);
			web3 = new Web3(wsProvider);
			return true;
		}
		else {
			// Add provider (Metamask)
			if (window.ethereum) {
				await window.ethereum.request({ method: "eth_requestAccounts" });
				web3 = new Web3(window.ethereum);
				return true;
			}
		} 
	}

    async function createMembership () {

      const _secret = "-secret";
      // Create identities for family members
      const identity1 = new Identity("self"+_secret);
      const identity2 = new Identity("spouse"+_secret);
      const identity3 = new Identity("kid"+_secret);

      const members = [identity1.commitment, identity2.commitment,
                       identity3.commitment];
      OwnerIdentity = identity1;
      OwnerGroup = new Group(members);
      console.log("Group(exported json):" + OwnerGroup.export());

      let member = [OwnerGroup.members[0], OwnerGroup.members[1],
                    OwnerGroup.members[2]];
      let root = OwnerGroup.root;
      OwnerGroupInfo = {member, root};
      return true;
    };   

	return (
		<div className="Connect">
			Address: {owner}
			<br />
			<br />
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
					let ret1 = await createProvider();
					let ret2 = await createMembership();
					let ret3 = await createContractInstance();
					let ret4 = await createWebSocketInstance();
					Connected = ret1 && ret2 && ret3 && ret4;
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
export {OwnerIdentity};
export {OwnerGroup};
export {OwnerGroupInfo};
export {LockContract};
export {Connected};
export {WS};
export {web3};