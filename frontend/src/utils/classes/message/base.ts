export type MessageMetadata = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export abstract class Message {
  constructor(public metadata: MessageMetadata) {}

  abstract next(action?: string): Message;

  protected createDefaultMetadata(text: string): MessageMetadata {
    return {
      ...this.metadata,
      text,
      id: Date.now().toString(),
    };
  }
}
