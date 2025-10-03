import { arbitrum, base, bsc, celo, flowMainnet, polygon } from "viem/chains";

/**
 * @deprecated
 */

export const JarvisBot_CONTRACTS = {
  [base.id]: {
    executor: "0xbB6Aed42b49e427FeA6048715e0a1E4F9cFfacA6",
  },
  [celo.id]: {
    executor: "0x2a386fb9e19d201a1daf875fcd5c934c06265b65",
  },
  [bsc.id]: {
    executor: "0xE6FE0766FF66B8768181B0f3f46E8e314F9277e0",
  },
  [flowMainnet.id]: {
    executor: "0xE6FE0766FF66B8768181B0f3f46E8e314F9277e0",
  },
  [arbitrum.id]: {
    executor: "0xe82810A810097732F97D9DD6bF66eb1E7D23f97E",
  },
  [polygon.id]: {
    executor: "0x2F3164c983EF3172472BEb98DbA6cE9B4343B102",
  },
} as const;
