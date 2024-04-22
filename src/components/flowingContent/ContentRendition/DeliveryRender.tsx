import { Delivery } from "../delivery/Delivery.tsx";
import { useNavigate } from "react-router-dom";

export function DeliveryRender() {
  const navigate = useNavigate();

  function handleNextClick() {
    navigate("/payment");
    window.scrollTo(0, 0);
  }
  function handleBackClick() {
    navigate("/basket");
    window.scrollTo(0, 0);
  }

  return (
    <Delivery
      handleNextClick={handleNextClick}
      handleBackClick={handleBackClick}
    />
  );
}

export default DeliveryRender;
