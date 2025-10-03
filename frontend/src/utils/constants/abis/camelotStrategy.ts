export const CAMELOT_STRATEGY_ABI = [
  {
    type: "function",
    name: "swapETHToXGrail",
    inputs: [
      {
        name: "trade",
        type: "tuple",
        internalType: "struct Trade",
        components: [
          { name: "amountIn", type: "uint256", internalType: "uint256" },
          { name: "amountOut", type: "uint256", internalType: "uint256" },
          { name: "path", type: "address[]", internalType: "address[]" },
          { name: "adapters", type: "address[]", internalType: "address[]" },
          { name: "recipients", type: "address[]", internalType: "address[]" },
        ],
      },
      { name: "user", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
] as const;
