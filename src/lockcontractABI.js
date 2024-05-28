const ABI =
  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_ownerverifier",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_groupverifier",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "BidRoomNow",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "guest",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "nonce",
          "type": "bytes"
        }
      ],
      "name": "GuestApproved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "guest",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "groupRoot",
          "type": "uint256"
        }
      ],
      "name": "GuestRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "guest",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "nonce0",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "nonce1",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "seed",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "counter",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "hmac",
              "type": "bytes"
            }
          ],
          "indexed": false,
          "internalType": "struct LockNonce",
          "name": "nonce",
          "type": "tuple"
        }
      ],
      "name": "RequestAuth",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "guest",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "nonce0",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "nonce1",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "seed",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "counter",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "hmac",
              "type": "bytes"
            }
          ],
          "indexed": false,
          "internalType": "struct LockNonce",
          "name": "nonce",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isOwnerVerfied",
          "type": "bool"
        }
      ],
      "name": "RespondAuth",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_guest",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "nonce",
          "type": "bytes"
        }
      ],
      "name": "approveGuest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "groupverifier",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "guestSessions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "counter",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "groupRoot",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ownerRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "ownerSessions",
      "outputs": [
        {
          "internalType": "bool",
          "name": "registered",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "counter",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "basePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "groupRoot",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "merkleTreeDepth",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "merkleTreeRoot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nullifier",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "message",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "scope",
              "type": "uint256"
            },
            {
              "internalType": "uint256[8]",
              "name": "points",
              "type": "uint256[8]"
            }
          ],
          "internalType": "struct SemaphoreProof",
          "name": "proof",
          "type": "tuple"
        }
      ],
      "name": "registerGuest",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_basePrice",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_groupRoot",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "merkleTreeDepth",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "merkleTreeRoot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nullifier",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "message",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "scope",
              "type": "uint256"
            },
            {
              "internalType": "uint256[8]",
              "name": "points",
              "type": "uint256[8]"
            }
          ],
          "internalType": "struct SemaphoreProof",
          "name": "proof",
          "type": "tuple"
        }
      ],
      "name": "registerOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "nonce0",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "nonce1",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "seed",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "counter",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "hmac",
              "type": "bytes"
            }
          ],
          "internalType": "struct LockNonce",
          "name": "_nonce",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "merkleTreeDepth",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "merkleTreeRoot",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nullifier",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "message",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "scope",
              "type": "uint256"
            },
            {
              "internalType": "uint256[8]",
              "name": "points",
              "type": "uint256[8]"
            }
          ],
          "internalType": "struct SemaphoreProof",
          "name": "proof",
          "type": "tuple"
        }
      ],
      "name": "reqAuth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_guest",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "nonce0",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "nonce1",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "seed",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "counter",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "hmac",
              "type": "bytes"
            }
          ],
          "internalType": "struct LockNonce",
          "name": "_nonce",
          "type": "tuple"
        },
        {
          "internalType": "uint256[2]",
          "name": "_proof0",
          "type": "uint256[2]"
        },
        {
          "internalType": "uint256[2][2]",
          "name": "_proof1",
          "type": "uint256[2][2]"
        },
        {
          "internalType": "uint256[2]",
          "name": "_proof2",
          "type": "uint256[2]"
        },
        {
          "internalType": "uint256[16]",
          "name": "_publicSignals",
          "type": "uint256[16]"
        }
      ],
      "name": "responseAuth",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

module.exports = {
  ABI: ABI
}