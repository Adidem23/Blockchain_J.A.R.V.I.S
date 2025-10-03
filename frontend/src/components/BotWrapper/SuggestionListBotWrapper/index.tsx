import React, { useMemo } from "react";

import { RiskLevel, StrategyMetadata } from "@/utils/types";
import { STRATEGIES_METADATA } from "@/utils/constants/strategies";
import SuggestionCard from "../../StrategyList/StrategyCard";

interface SuggestionListBotWrapperProps {
  selectedRiskLevel: RiskLevel;
  selectedChains: number[];
}

const SuggestionListBotWrapper = ({
  selectedChains,
  selectedRiskLevel,
}: SuggestionListBotWrapperProps) => {
  const filteredStrategies = useMemo(() => {
    let filtered = STRATEGIES_METADATA;

    if (selectedRiskLevel.length > 0) {
      filtered = filtered.filter((strategy) =>
        selectedRiskLevel.includes(strategy.risk)
      );
    }

    if (selectedChains.length > 0) {
      filtered = filtered.filter((strategy) =>
        selectedChains.includes(strategy.chainId)
      );
    }

    return filtered;
  }, [selectedRiskLevel, selectedChains]);

  return (
    <>
      {filteredStrategies.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            <h3 className="text-base font-semibold text-black">
              Found {filteredStrategies.length} Strategies
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredStrategies.map(
              (strategy: StrategyMetadata, index: number) => (
                <SuggestionCard key={index} {...strategy} />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <h3 className="text-base font-semibold text-gray-600">No Strategies Found</h3>
          </div>
          <p className="text-sm text-gray-500">Try adjusting your filters to see more results</p>
        </div>
      )}
    </>
  );
};

export default SuggestionListBotWrapper;
