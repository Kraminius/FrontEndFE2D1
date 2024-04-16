import { useNavigate } from "react-router";

interface ContinueButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  // onClick: () => void;
  isDisabled?: boolean;
  href?: string;
}

export const ContinueButton = ({
  isDisabled,
  onClick,
  href,
  ...rest
}: ContinueButtonProps) => {
  const navigate = useNavigate();
  return (
    <div className="continue">
      <button
        className="continue__button"
        disabled={isDisabled}
        onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
          evt.currentTarget.blur();
          // evt.currentTarget.disabled = true;
          if (href) {
            navigate(href);
          }
          if (onClick) {
            onClick(evt);
          }
        }}
        {...rest}
      >
        Continue
      </button>
    </div>
  );
};

// interface BackButtonProps {
// 	onClick: () => void;
// 	href: string;
// }
// export const BackButton = ({ onClick, href }: BackButtonProps) => {
// 	const navigate = useNavigate();
// 	return <div className="back">
// 		<button className="back-button" onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
// 			evt.preventDefault();
// 			onClick();
// 			if (href) {
// 				navigate(href);
// 			}
// 		}}>
// 			Back
// 		</button>
// 	</div>
// };
