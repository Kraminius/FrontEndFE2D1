import { useState } from "react";
import { BackButton, ContinueButton } from "../Buttons.tsx";
import PaymentPage from "../payment/PaymentPage.tsx";
import { useNavigate } from "react-router-dom";
import { useBasketContext } from "../../../context/BasketContext.tsx";

export function PaymentRender() {
	const navigate = useNavigate();
	const [isContinueDisabled, setIsContinueDisabled] = useState(false);


	function handleNextClick() {
		navigate("/receipt");
		window.scrollTo(0, 0);

	}
	function handleBackClick() {
		navigate("/delivery");
		window.scrollTo(0, 0);
	}

	return (
		<div>
			<PaymentPage isContinueDisabled={setIsContinueDisabled} />
			<ContinueButton
				onClick={handleNextClick}
				isDisabled={isContinueDisabled}
			/>
			<BackButton onClick={handleBackClick} />
		</div>
	);
}

export default PaymentRender;
