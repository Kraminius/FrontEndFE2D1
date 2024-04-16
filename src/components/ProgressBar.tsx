import React from "react";
import { ContentFlow } from "./flowingContent/FlowingContent";

interface ProgressBarProps {
  currentFlow: ContentFlow;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentFlow }) => {
  let progressPercentage = 0;
  switch (currentFlow) {
    case ContentFlow.Basket:
      progressPercentage = 25;
      break;
    case ContentFlow.Delivery:
      progressPercentage = 50;
      break;
    case ContentFlow.Payment:
      progressPercentage = 75;
      break;
    case ContentFlow.Receipt:
      progressPercentage = 100;
      break;
  }
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};
