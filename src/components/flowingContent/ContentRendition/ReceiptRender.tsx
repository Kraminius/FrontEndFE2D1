import { useBasketContext } from "../../../context/BasketContext.tsx";
import ReceiptPage from "../receipt/ReceiptPage.tsx";
import { useNavigate } from "react-router-dom";
import { BasketItem } from "../../../types/Types.ts";
import { isPaymentCompleted } from "../../../context/PaymentContext.tsx";
import { useEffect } from "react";

export function ReceiptRender() {
	const navigate = useNavigate();
	const basketItems = useBasketContext();
	const paymentCompleted = isPaymentCompleted();

	/**Mega downside of not using backend verification; This works. UNTIL you update the browser while being
	 * on the receipt page. Then the paymentCompleted state is lost and you are redirected to the home page.
	 * This is because the paymentCompleted state is not stored in the local storage, or we could have checked
	 * validated from backend on the receipt page (and other pages too)
	 */
	useEffect(() => {
		if (!paymentCompleted) {
		navigate("/");
		}
	}, [paymentCompleted, navigate]);

	function handleBackClick() {
		navigate("/payment");
		window.scrollTo(0, 0);
	}

	return (
		<Receipt handleBackClick={handleBackClick} basketItems={basketItems} />
	);
}

function Receipt({
	basketItems,
}: {
	handleBackClick: () => void;
	basketItems: BasketItem[];
}) {
	return (
		<div>
			<ReceiptPage items={basketItems} />
		</div>
	);
}

export default ReceiptRender;
