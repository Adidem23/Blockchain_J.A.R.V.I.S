export const GMX_STRATEGY_ABI = [
  {
    inputs: [],
    name: "depositToBeefyVaultWithETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "beefyVault",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_beefyVault",
        type: "address",
      },
    ],
    name: "setBeefyVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
