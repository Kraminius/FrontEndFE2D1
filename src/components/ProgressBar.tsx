import React from "react";
import { ContentFlow } from "./flowingContent/FlowingContent";
import {useBasket} from "../RenditionContext.tsx";


export const ProgressBar: React.FC = () => {

    const { contentFlow } = useBasket();

  const numEnumValues = Object.keys(ContentFlow).length / 2;
  const progressPercentage = ((contentFlow + 1) / numEnumValues) * 100;
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};
