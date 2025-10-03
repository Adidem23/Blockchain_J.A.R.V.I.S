import React, { useState } from "react";
import { Percent } from "lucide-react";

import type { RiskPortfolioStrategies } from "@/utils/types";
import { toast } from "react-toastify";
import Button from "../Button";

export type ChangePercentStrategy = {
  name: string;
  percentage: number;
};

type ChangePercentListProps = {
  riskPortfolioStrategies: RiskPortfolioStrategies[];
  setRiskPortfolioStrategies: (strategies: RiskPortfolioStrategies[]) => void;
  nextStep: () => void;
  isEditable: boolean;
};

const createChangePercentStrategy = (
  strategies: RiskPortfolioStrategies[]
): ChangePercentStrategy[] => {
  return strategies.map((strategy) => ({
    name: strategy.title,
    percentage: strategy.allocation,
  }));
};

const ChangePercentList = ({
  riskPortfolioStrategies,
  setRiskPortfolioStrategies,
  nextStep,
  isEditable,
}: ChangePercentListProps) => {
  const [strategies, setStrategies] = useState(
    createChangePercentStrategy(riskPortfolioStrategies)
  );

  const handleInputChange = (index: number, value: string) => {
    // Only allow edits when in editing mode
    if (!isEditable) return;

    if (!/^\d*$/.test(value)) return;

    // Convert to number and limit to 0-100
    const numValue = value === "" ? 0 : Math.min(100, parseInt(value));

    // Update the specific strategy's percentage
    const updatedStrategies = [...strategies];
    updatedStrategies[index] = {
      ...updatedStrategies[index],
      percentage: numValue,
    };

    setStrategies(updatedStrategies);

    // Update parent component's strategy state
    const updatedRiskStrategies = [...riskPortfolioStrategies];
    updatedRiskStrategies[index] = {
      ...updatedRiskStrategies[index],
      allocation: numValue,
    };

    setRiskPortfolioStrategies(updatedRiskStrategies);
  };

  const reviewChange = () => {
    const totalPercentage = strategies.reduce(
      (sum, strategy) => sum + strategy.percentage,
      0
    );
    if (totalPercentage !== 100) {
      toast.error("The total percentage must equal 100.");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full flex flex-col items-start gap-7">
      <div className="flex flex-col w-full gap-2">
        {strategies.map((strategy, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-between items-center w-full p-1 gap-5">
              <span className="text-[rgba(0,0,0,0.7)] font-[Manrope] font-medium text-sm">
                {strategy.name}
              </span>

              <input
                className="bg-white text-center border border-[#CBD5E1] rounded-md py-1.5 px-4.5 w-[72px] text-[#17181C] font-[Inter] text-sm"
                value={strategy.percentage}
                onChange={(e) => handleInputChange(index, e.target.value)}
                type="text"
                inputMode="numeric"
              />
            </div>
            {index < strategies.length - 1 && (
              <div className="w-full h-[1px] bg-[#CAC4D0]"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <Button
        onClick={reviewChange}
        text="Review Percentage"
        disabled={!isEditable}
        icon={<Percent />}
      />
    </div>
  );
};

export default ChangePercentList;
