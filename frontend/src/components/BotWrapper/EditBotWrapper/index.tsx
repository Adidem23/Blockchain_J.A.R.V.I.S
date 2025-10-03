import React, { useState } from "react";

import type { RiskPortfolioStrategies } from "@/utils/types";

import ChangePercentList from "../../ChangePercentList";
import { EditMessage } from "@/utils/classes/message";
import { Message } from "@/utils/classes/message";

interface EditBotWrapperProps {
  message: EditMessage;
  addBotMessage: (message: Message) => Promise<void>;
}

const EditBotWrapper: React.FC<EditBotWrapperProps> = ({
  message,
  addBotMessage,
}) => {
  const [strategies, setStrategies] = useState<RiskPortfolioStrategies[]>(
    message.strategies
  );
  const [isEdit, setIsEdit] = useState(true);

  const nextMessage = async () => {
    // Settle message attributes
    message.strategies = strategies;

    setIsEdit(false);
    await addBotMessage(message.next());
  };

  return (
    <div className="overflow-x-auto max-w-full">
      <ChangePercentList
        riskPortfolioStrategies={strategies}
        setRiskPortfolioStrategies={setStrategies}
        isEditable={isEdit}
        nextStep={nextMessage}
      />
    </div>
  );
};

export default EditBotWrapper;
