import { Dispatch, SetStateAction } from "react";

import { RiskBadge } from "./RiskPortfolio";
import { RiskLevel } from "@/utils/types";

interface RiskBadgeListProps {
  selectedRisk: RiskLevel;
  isEditable: boolean;
  setSelectedRiskLevel: Dispatch<SetStateAction<RiskLevel>>;
  options: readonly string[];
}

export const RiskBadgeList = ({
  selectedRisk,
  isEditable,
  setSelectedRiskLevel,
  options,
}: RiskBadgeListProps) => {
  return (
    <div className="flex flex-wrap gap-[18px] items-center md:justify-start">
      {options.map((risk) => (
        <RiskBadge
          key={risk}
          label={risk}
          isSelected={risk === selectedRisk}
          isEditable={isEditable}
          setSelectedRiskLevel={setSelectedRiskLevel}
        />
      ))}
    </div>
  );
};
