import React, { FC, useState } from "react";
import { Search, TrendingUp, Shield, Zap } from "lucide-react";
import Image from "next/image";

import { RiskLevel } from "@/utils/types";
import { RISK_OPTIONS } from "@/utils/constants/risk";
import { FindStrategiesMessage, Message } from "@/utils/classes/message";
import { CHAINS } from "@/utils/constants/chains";

interface FindStrategiesBotWrapperProps {
  message: FindStrategiesMessage;
  addBotMessage: (message: Message) => Promise<void>;
}

const FindStrategiesBotWrapper: FC<FindStrategiesBotWrapperProps> = ({
  message,
  addBotMessage,
}) => {
  const [chains, setChains] = useState<number[]>(message.chains);
  const [risk, setRisk] = useState<RiskLevel>(message.risk);
  const [isEdit, setIsEdit] = useState(true);

  const nextMessage = async () => {
    message.chains = chains;
    message.risk = risk;

    setIsEdit(false);

    await addBotMessage(message.next());
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low": return <Shield className="w-4 h-4" />;
      case "medium": return <TrendingUp className="w-4 h-4" />;
      case "high": return <Zap className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getRiskDescription = (riskLevel: string) => {
    switch (riskLevel) {
      case "low": return "Conservative approach with stable returns";
      case "medium": return "Balanced risk-reward strategies";
      case "high": return "Aggressive strategies for maximum yield";
      default: return "Select your risk preference";
    }
  };

  return (
    <div className="bg-white text-black border border-gray-200 rounded-xl p-6 max-w-lg shadow-lg">

      {/* Chain Selection */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          Select Networks
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {CHAINS.map((chain) => (
            <button
              key={chain.id}
              type="button"
              className={`relative group p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                chains.length > 0
                  ? chains.includes(chain.id)
                    ? "border-black bg-black/5 shadow-md"
                    : "border-gray-300 opacity-50 hover:opacity-70"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => {
                setChains((prev) =>
                  prev.includes(chain.id)
                    ? prev.filter((id) => id !== chain.id)
                    : [...prev, chain.id]
                );
              }}
              aria-label={chain.name}
            >
              <div className="flex flex-col items-center gap-1">
                <Image
                  src={chain.icon}
                  alt={chain.name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-xs font-medium truncate w-full text-center">
                  {chain.name}
                </span>
              </div>
              {chains.includes(chain.id) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full border-2 border-white"></div>
              )}
            </button>
          ))}
        </div>
        {chains.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {chains.length} network{chains.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Risk Selection */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          Risk Tolerance
        </h3>
        <div className="space-y-2">
          {RISK_OPTIONS.map((riskLevel) => (
            <button
              key={riskLevel}
              type="button"
              className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                risk === riskLevel
                  ? "border-black bg-black text-white shadow-md"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              } ${!isEdit ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              onClick={() => isEdit && setRisk(riskLevel as RiskLevel)}
              disabled={!isEdit}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    risk === riskLevel ? "bg-white/20" : "bg-gray-200"
                  }`}>
                    {getRiskIcon(riskLevel)}
                  </div>
                  <div>
                    <div className="font-semibold capitalize text-sm">
                      {riskLevel} Risk
                    </div>
                    <div className={`text-xs ${
                      risk === riskLevel ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {getRiskDescription(riskLevel)}
                    </div>
                  </div>
                </div>
                {risk === riskLevel && (
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={nextMessage}
        disabled={!isEdit || chains.length === 0}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
          !isEdit || chains.length === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800 hover:scale-[1.02] shadow-md"
        }`}
      >
        <Search className="w-4 h-4" />
        Search
      </button>

      {chains.length === 0 && (
        <p className="text-center text-gray-400 text-xs mt-2">
          Please select at least one network to continue
        </p>
      )}
    </div>
  );
};

export default FindStrategiesBotWrapper;
