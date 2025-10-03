import { Message, MessageMetadata } from "./base";
import { RiskLevel } from "@/utils/types/strategies";

export class StrategiesCardsMessage extends Message {
  constructor(
    metadata: MessageMetadata,
    public readonly risk: RiskLevel,
    public readonly chains: number[]
  ) {
    super(metadata);
  }

  next(): Message {
    throw new Error(
      "StrategiesCardsMessage does not have default next message"
    );
  }
}
