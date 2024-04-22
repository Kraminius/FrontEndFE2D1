import { useEffect, useState } from "react";
import { useBasket } from "../../../context/ContentContext.tsx";
import { Delivery } from "../delivery/Delivery.tsx";
import { useNavigate } from "react-router-dom";
import { ContentFlow } from "../FlowingContent.tsx";

export function DeliveryRender() {
  //const { basketItems, setBasketItems, contentFlow, setContentFlow } = useBasket();
  const { setContentFlow } = useBasket();
  const navigate = useNavigate();

  const [, setIsDeliveryFormValid] = useState(true);

  useEffect(() => {
    setContentFlow(ContentFlow.Delivery);
  }, [setContentFlow]);

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
      setIsDeliveryFormValid={setIsDeliveryFormValid}
      handleNextClick={handleNextClick}
      handleBackClick={handleBackClick}
    />
  );
}

export default DeliveryRender;
