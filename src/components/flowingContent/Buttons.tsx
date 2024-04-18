interface ContinueButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
}

export const ContinueButton = ({
  isDisabled,
  onClick,
}: ContinueButtonProps) => (
  <div className="continue">
    <button
      className="continue__button"
      disabled={isDisabled}
      onClick={onClick}
    >
      Continue
    </button>
  </div>
);

export const BackButton = ({ onClick }: { onClick: () => void }) => (
  <div className="back">
    <button className="back-button" onClick={onClick}>
      Back
    </button>
  </div>
);
