import { arbitrum } from "viem/chains";

export const GMX_CONTRACTS = {
  [arbitrum.id]: {
    beefyVault: "0x5B904f19fb9ccf493b623e5c8cE91603665788b0",
    gmxStrategy: "0xC5943Be661378fA544d606cADCC67D3487AE25C9", // From the deployment log
  },
} as const;
