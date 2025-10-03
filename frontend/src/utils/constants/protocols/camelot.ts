import { arbitrum } from "viem/chains";

export const CAMELOT_CONTRACTS = {
  [arbitrum.id]: {
    yakRouter: "0x99D4e80DB0C023EFF8D25d8155E0dCFb5aDDeC5E",
    camelotStrategy: "0x178762937e228b5bc2d4c95ff012934c68c54be9",
    dividendsV2: "0x5422AA06a38fd9875fc2501380b40659fEebD3bB",
  },
} as const;
