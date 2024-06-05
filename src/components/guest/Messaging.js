import Web3  from 'web3';
import { useState, useEffect } from 'react';
import {Guest, LockContract, Connected, WS} from "./Connect";
import { createLightNode,
		 waitForRemotePeer,
		 Protocols,
		 createDecoder,
		 createEncoder,
		 utf8ToBytes } from "@waku/sdk";

var Node = null;
const ContentTopic = "/waku-workshop/1/talk-feedback/json";
const PubsubTopic = "/waku/2/default-waku/proto";
const MessageKey = "secret-key";

function Messaging () {
	var decoder = createDecoder(ContentTopic, PubsubTopic, MessageKey);
	var encoder = createEncoder({ contentTopic: ContentTopic,
						pubsubTopic: PubsubTopic,
						symKey: MessageKey});

	let messagePrefix = "Guest: ";

	const [messageList, setMessageList] = useState("default:");
	const [message, setMessage] = useState(messagePrefix);

	useEffect(() => {
		if (Connected == true) {
			console.log("CONNECTED....");
			if (!Node) {
				(async () => {
					console.log("Starting node");
					await startNode();
				})();
			}
		}
	}, [Connected]);

	async function startNode () {
		Node = await createLightNode({
		  deafulBootstrap: false,
	      bootstrapPeers: [
	          "/dns4/node-01.gc-us-central1-a.wakuv2.prod.statusim.net/tcp/8000/wss/p2p/16Uiu2HAmVkKntsECaYfefR1V2yCR79CegLATuTPE6B9TxgxBiiiA",
	          "/dns4/node-01.ac-cn-hongkong-c.wakuv2.prod.status.im/tcp/8000/wss/p2p/16Uiu2HAm4v86W3bmT1BiH6oSPzcsSr24iDQpSN5Qa992BCjjwgrD",
	          "/dns4/node-01.do-ams3.wakuv2.test.status.im/tcp/8000/wss/p2p/16Uiu2HAmPLe7Mzm8TsYUubgCAW1aJoeFScxrLj8ppHFivPo97bUZ"
	      ]
		});

		await Node.start();
		console.log("Started");
		await waitForRemotePeer(Node, [Protocols.LighPush, Protocols.Filter]);
		console.log("Waited");

	    Node.store.protocol.addLibp2pEventListener("peer:connect", async (event) => {
	      const peerId = event.detail;
	      console.log(`Peer connected with peer id: ${peerId}`);

	      setTimeout(async() => {
	        await updatePeers();
	      }) 
	    })

		await receiveMessages();
	}

	async function updatePeers() {
		const peers = await Node.libp2p.peerStore.all();
		console.log("peers:",  peers);
	} 

	async function receiveMessages () {

		const callback = (message) => {
			if(!message.payload) return;

			const payload = message.payload;
			let ownerMsg = String.fromCharCode(...payload);
			console.log("payload:", ownerMsg);
			let msg = messageList + " " + ownerMsg;
			setMessageList(msg);
		}

		console.log("this.node:", Node);
		const subscription = await Node.filter.createSubscription(PubsubTopic);

		await subscription.subscribe([decoder], callback);
	}

	async function sendMessage () {
		const talk = "Hi";
		const comment = "Hello";
		const toSend = {talk: talk, comment: comment}

		const result = await Node.lightPush.send(encoder, {
		  payload: utf8ToBytes(message),
		});

		if (result.successes.length > 0) {
		    console.log("Message sent!");
		} else {
		    console.error(result.failures)
		}
		console.log("sending message..:" + message);
	}

	return (
		<div className="Messaging">
			<h2>Chat Messages</h2>
			<br/>
			<input placeholder="Messages from Owner will appear here.."
				style={{height:"240px", width:"420px", align: "top"}}
				type="text"
				onChange={(event) => setMessageList(event.target.value)}
				value={messageList}
			/>
			<br/>
			<br/>
			<input placeholder="Enter message to send to Owner.."
				style={{height:"42px", width:"420px"}}
				type="text"
				onChange={(event) => setMessage(event.target.value)}
				value={message}
			/>
			<br/>
			<br/>
			<button
				style={{padding:"12px", border:"none"}}			
				onClick={async () => {
					console.log("Pressed");
					await sendMessage();
				}}
			>
				Send
			</button>
		</div>		
	);
}

export {Messaging};
export {Node};
export {ContentTopic};
export {PubsubTopic};