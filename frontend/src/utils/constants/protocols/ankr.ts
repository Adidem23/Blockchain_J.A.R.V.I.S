import { flowMainnet } from "viem/chains";

/**
 * @deprecated
 */

export const ANKR_CONTRACTS = {
  [flowMainnet.id]: {
    ankrFLOW: "0xFE8189A3016cb6A3668b8ccdAC520CE572D4287a",
  },
} as const;
