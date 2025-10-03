import { Message, MessageMetadata } from "./base";

export class TextMessage extends Message {
  constructor(metadata: MessageMetadata) {
    super(metadata);
  }

  next(): Message {
    throw new Error("TextMessage does not have next message");
  }
}
