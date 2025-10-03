import { RiskLevel, RiskPortfolioStrategies } from "./strategies";

export type MessageStrategy = Record<string, number>;

export type MessagePortfolioData = {
  risk: RiskLevel;
  strategies: RiskPortfolioStrategies[];
};

export const StaticMessageType = [
  "Text",
  "Strategies Cards",
  "Deposit Funds",
  "Find Strategies",
  "Review Portfolio",
] as const;

export const DynamicMessageType = [
  "Invest",
  "Portfolio",
  "Edit",
  "Build Portfolio",
] as const;

export type MessageType =
  | (typeof StaticMessageType)[number]
  | (typeof DynamicMessageType)[number];

/**
 * @deprecated use Message from classes/message instead
 */
export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type: MessageType;
  data?: MessagePortfolioData;
}
