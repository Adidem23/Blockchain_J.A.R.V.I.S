import { RiskLevel } from "./strategies";

export type BotResponse = {
  type: BotResponseType;
  data: BotResponseData;
};

export type BotResponseType =
  | "strategies"
  | "question"
  | "build_portfolio"
  | "analyze_portfolio";

export type BotResponseData = {
  risk_level: RiskLevel;
  chain: number;
} & {
  answer: string;
};
