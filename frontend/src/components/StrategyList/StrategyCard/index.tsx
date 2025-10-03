import Image from "next/image";
import Link from "next/link";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@/components/Tooltip";

import InvestModal from "./InvestModal";
import { getRiskColor } from "@/utils";
import { useChat } from "@/contexts/ChatContext";
import type { Message, RiskLevel, StrategyMetadata } from "@/utils/types";

function getRiskLevelLabel(risk: RiskLevel) {
  switch (risk) {
    case "low":
      return "Low Risk";
    case "medium":
      return "Medium Risk";
    case "high":
      return "High Risk";
    default:
      return "Unknown";
  }
}

export default function SuggestionCard(strategy: StrategyMetadata) {
  const { title, id, apy, risk, description, tokens, chainId, protocol } =
    strategy;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract the base description without "Learn More" text
  const baseDescription = description.replace(/\s*Learn More\s*$/, "");

  const { openChat, setMessages } = useChat();
  const router = useRouter();

  const handleCardClick = (e: MouseEvent) => {
    // Don't navigate if clicking on a link or button
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [role="button"]')) {
      e.stopPropagation();
      return;
    }
    router.push(`/strategies/${id}`);
  };

  const handleBotClick = async () => {
    // const prompt = `Hello. Can you explain the ${title} in 50 words?`;

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `${strategy.title} intro: \n\n${strategy.fullDescription} \n\nDo you have any questions about this DeFi strategy?`,
      sender: "bot",
      timestamp: new Date(),
      type: "Text",
    };
    setMessages((prev) => [...prev, botMessage]);

    openChat();
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
      >
        {/* Header Section */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image
              src={`/crypto-icons/chains/${chainId}.svg`}
              alt={title}
              width={24}
              height={24}
              className="rounded-full"
            />
            <div>
              <h3 className="text-sm font-semibold text-black line-clamp-1">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-gray-600">
                  APY {apy}%
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  risk === 'low' ? 'bg-green-100 text-green-700' :
                  risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {getRiskLevelLabel(risk)}
                </span>
              </div>
            </div>
          </div>
          <Tooltip protocol={protocol} description={baseDescription} />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-3 gap-4 mb-3 text-xs">
          <div>
            <div className="text-gray-500 mb-1">Protocol</div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-black truncate">
                {protocol.name}
              </span>
              {protocol.link && (
                <Link
                  href={protocol.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Open protocol in new tab"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33333 9.33333H2.66667V2.66667H6V1.33333H2.66667C1.93333 1.33333 1.33333 1.93333 1.33333 2.66667V9.33333C1.33333 10.0667 1.93333 10.6667 2.66667 10.6667H9.33333C10.0667 10.6667 10.6667 10.0667 10.6667 9.33333V6H9.33333V9.33333ZM7.33333 1.33333V2.66667H9.02L4.12 7.56667L5.06667 8.51333L10 3.58V5.33333H11.3333V1.33333H7.33333Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-gray-500 mb-1">TVL</div>
            <div className="font-medium text-black">
              ${Math.abs(
                title
                  .split("")
                  .reduce(
                    (hash, char) =>
                      (hash << 5) - hash + char.charCodeAt(0),
                    0
                  ) % 100
              )}M
            </div>
          </div>

          <div>
            <div className="text-gray-500 mb-1">Tokens</div>
            <div className="flex items-center gap-1">
              {tokens.slice(0, 3).map((token) => (
                <div key={token.name} className="w-4 h-4 relative">
                  <Image
                    src={token.icon}
                    alt={token.name}
                    className="object-contain"
                    fill
                  />
                </div>
              ))}
              {tokens.length > 3 && (
                <span className="text-gray-500 text-xs">+{tokens.length - 3}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button
            className="flex-1 py-2 px-3 bg-black text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Invest
          </button>
          <button
            onClick={handleBotClick}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Ask Bot"
          >
            <Image
              src="/bot-icon.svg"
              alt="Ask bot"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>

      <InvestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        strategy={strategy}
      />
    </>
  );
}
