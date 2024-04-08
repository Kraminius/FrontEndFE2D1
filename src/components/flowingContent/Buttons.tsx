interface ContinueButtonProps {
    onClick: () => void;
    isDisabled?: boolean;
    rest?: any;
}

export const ContinueButton = ({isDisabled, ...rest}: ContinueButtonProps) => (
    <div className="continue">
        <button
            className="continue__button"
            disabled={isDisabled}
            {...rest}
        >
            Continue
        </button>
    </div>
)

export const BackButton = ({onClick}: {onClick: () => void}) => (
	<div className="back">
		<button className="back-button" onClick={onClick}>Back</button>
	</div>
)