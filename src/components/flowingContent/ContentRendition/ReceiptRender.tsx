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
