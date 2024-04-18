import React from "react";
import { ContentFlow } from "./flowingContent/FlowingContent";

interface ProgressBarProps {
  currentFlow: ContentFlow;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentFlow }) => {
  const numEnumValues = Object.values(ContentFlow).filter(
    (value) => typeof value === "number",
  ).length;
  const progressPercentage = ((currentFlow + 1) / numEnumValues) * 100;
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};
