import React from "react";
import { useLocation } from "react-router-dom";

export const ProgressBar: React.FC = () => {
  const progressPercentage = useGetProgressPercentage();
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: progressPercentage }}
      />
    </div>
  );
};
function useGetProgressPercentage() {
  const { pathname } = useLocation();

  let progressPercentage = 0;
  switch (pathname) {
    case "/basket":
      progressPercentage = 25;
      break;
    case "/delivery":
      progressPercentage = 50;
      break;
    case "/payment":
      progressPercentage = 75;
      break;
    case "/receipt":
      progressPercentage = 100;
      break;
    default:
      progressPercentage = 0;
  }
  return progressPercentage + "%";
}
