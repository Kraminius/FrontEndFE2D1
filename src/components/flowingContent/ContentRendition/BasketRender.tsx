// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import { RecurringOrder } from "../../../types/Types.ts";
import CustomerItemCard from "../CustomerItemCard.tsx";
import { ContinueButton } from "../Buttons.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ContentFlow } from "../FlowingContent.tsx";
import {
  useBasketContext,
  useBasketDispatchContext,
} from "../../../context/BasketContext.tsx";
import { useContentContext } from "../../../context/ContentContext.tsx";

export function BasketRender() {
  const { setContentFlow } = useContentContext();
  const navigate = useNavigate();

  useEffect(() => {
    setContentFlow(ContentFlow.Basket);
  }, [setContentFlow]);

  function handleNextClick() {
    navigate("/delivery");
    window.scrollTo(0, 0);
  }
  return <Basket handleNextClick={handleNextClick} />;
}

interface BasketProps {
  handleNextClick: () => void;
}

function Basket({ handleNextClick }: BasketProps) {
  const basketItems = useBasketContext();
  const dispatch = useBasketDispatchContext();
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, newQuantity } });
  };

  const handleGiftWrapChange = (itemId: string) => {
    dispatch({ type: "TOGGLE_GIFT_WRAP", payload: { itemId } });
  };

  const handleRecurringOrderChange = (
    itemId: string,
    newRecurringOrder: RecurringOrder
  ) => {
    if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
      dispatch({
        type: "UPDATE_RECURRING_ORDER",
        payload: { itemId, newRecurringOrder },
      });
    } else {
      console.error("Invalid recurring order type.");
    }
  };

  const handleRemove = (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  };

  return basketItems.length > 0 ? (
    <>
      <div className="basket-items">
        {basketItems.map((item) => (
          <CustomerItemCard
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onGiftWrapChange={handleGiftWrapChange}
            onRecurringOrderChange={handleRecurringOrderChange}
            onRemove={() => handleRemove(item.id)}
          />
        ))}
      </div>
      <ContinueButton onClick={handleNextClick} />
    </>
  ) : (
    <div className="empty-basket-message">
      Your basket is empty. <a href="/browse">Browse more items</a>
    </div>
  );
}

export default BasketRender;
