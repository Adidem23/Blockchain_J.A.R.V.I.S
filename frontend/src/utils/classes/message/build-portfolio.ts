import { Message, MessageMetadata } from "./base";
import { TextMessage } from "./text";
import { RiskPortfolioStrategies } from "@/utils/types/strategies";

export class BuildPortfolioMessage extends Message {
  constructor(
    metadata: MessageMetadata,
    public amount: string,
    public strategies: RiskPortfolioStrategies[]
  ) {
    super(metadata);
  }

  next(): Message {
    return new TextMessage(this.metadata);
  }

  execute(): void {
    this.strategies.forEach((strategy) => {
      console.log(strategy.title);
    });

    console.log("Portfolio built successfully");
  }
}
