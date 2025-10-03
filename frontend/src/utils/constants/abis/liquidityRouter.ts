export const LIQUIDITY_ROUTER_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_nonfungiblePositionManager",
        type: "address",
        internalType: "contract INonfungiblePositionManager",
      },
      {
        name: "_token0",
        type: "address",
        internalType: "address",
      },
      {
        name: "_token1",
        type: "address",
        internalType: "address",
      },
      {
        name: "_poolFee",
        type: "uint24",
        internalType: "uint24",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "TOKEN0",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "TOKEN1",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deposits",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "liquidity",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "token0",
        type: "address",
        internalType: "address",
      },
      {
        name: "token1",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPosition",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ILiquidityExamples.Deposit",
        components: [
          {
            name: "owner",
            type: "address",
            internalType: "address",
          },
          {
            name: "liquidity",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "token0",
            type: "address",
            internalType: "address",
          },
          {
            name: "token1",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "increaseLiquidity",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "token0Amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "token1Amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mintNewPosition",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount0ToMint",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "amount1ToMint",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "liquidity",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "amount0",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "nonfungiblePositionManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract INonfungiblePositionManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onERC721Received",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "poolFee",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint24",
        internalType: "uint24",
      },
    ],
    stateMutability: "view",
  },
] as const;
