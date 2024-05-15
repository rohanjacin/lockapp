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
          "name": "_auction",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_ownerverifier",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_guestverifier",
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
              "internalType": "uint16",
              "name": "counter",
              "type": "uint16"
            },
            {
              "internalType": "bytes",
              "name": "nonce0",
              "type": "bytes"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
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
              "name": "locknonce",
              "type": "tuple"
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
              "name": "ownernonce",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "p",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "ts",
                  "type": "uint256"
                }
              ],
              "internalType": "struct LockZKP.GuestProof",
              "name": "gproof",
              "type": "tuple"
            }
          ],
          "indexed": false,
          "internalType": "struct LockZKP.GuestSession",
          "name": "ctx",
          "type": "tuple"
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
              "internalType": "uint16",
              "name": "counter",
              "type": "uint16"
            },
            {
              "internalType": "bytes",
              "name": "nonce0",
              "type": "bytes"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
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
              "name": "locknonce",
              "type": "tuple"
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
              "name": "ownernonce",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "p",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "ts",
                  "type": "uint256"
                }
              ],
              "internalType": "struct LockZKP.GuestProof",
              "name": "gproof",
              "type": "tuple"
            }
          ],
          "indexed": false,
          "internalType": "struct LockZKP.GuestSession",
          "name": "ctx",
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
              "internalType": "uint16",
              "name": "counter",
              "type": "uint16"
            },
            {
              "internalType": "bytes",
              "name": "nonce0",
              "type": "bytes"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
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
              "name": "locknonce",
              "type": "tuple"
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
              "name": "ownernonce",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "p",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "ts",
                  "type": "uint256"
                }
              ],
              "internalType": "struct LockZKP.GuestProof",
              "name": "gproof",
              "type": "tuple"
            }
          ],
          "indexed": false,
          "internalType": "struct LockZKP.GuestSession",
          "name": "ctx",
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
      "inputs": [],
      "name": "bidIncrement",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "canceled",
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
      "inputs": [],
      "name": "endBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "fundsByBidder",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "guestSessions",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "counter",
          "type": "uint16"
        },
        {
          "internalType": "bytes",
          "name": "nonce0",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
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
          "name": "locknonce",
          "type": "tuple"
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
          "name": "ownernonce",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "p",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ts",
              "type": "uint256"
            }
          ],
          "internalType": "struct LockZKP.GuestProof",
          "name": "gproof",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "highestBidder",
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
      "inputs": [],
      "name": "highestBindingBid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ipfsHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
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
      "inputs": [],
      "name": "startBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
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
          "name": "_guest",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "nonce0",
          "type": "bytes"
        }
      ],
      "name": "approveGuest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
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
    },
    {
      "inputs": [],
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
    }
  ]

module.exports = {
  ABI: ABI
}