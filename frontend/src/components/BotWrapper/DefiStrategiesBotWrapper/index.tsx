import React from "react";

import SuggestionListBotWrapper from "../SuggestionListBotWrapper";
import { StrategiesCardsMessage } from "@/utils/classes/message";

interface DefiStrategiesCardsBotWrapperProps {
  message: StrategiesCardsMessage;
}

const DefiStrategiesCardsBotWrapper: React.FC<
  DefiStrategiesCardsBotWrapperProps
> = ({ message }) => {
  return (
    <SuggestionListBotWrapper
      selectedChains={message.chains}
      selectedRiskLevel={message.risk}
    />
  );
};

export default DefiStrategiesCardsBotWrapper;
