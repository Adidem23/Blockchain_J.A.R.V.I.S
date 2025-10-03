import { Message, MessageMetadata } from "./base";
import { StrategiesCardsMessage } from "./strategies-cards";
import { RiskLevel } from "@/utils/types/strategies";

export class FindStrategiesMessage extends Message {
  constructor(
    metadata: MessageMetadata,
    public risk: RiskLevel,
    public chains: number[]
  ) {
    super(metadata);
  }

  next(): Message {
    return new StrategiesCardsMessage(
      this.createDefaultMetadata("DeFi Strategies Cards"),
      this.risk,
      this.chains
    );
  }
}
