// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import CustomerItemCard from "../CustomerItemCard.tsx";
import { ContinueButton } from "../Buttons.tsx";
import { useNavigate } from "react-router-dom";
import { useBasketContext } from "../../../context/BasketContext.tsx";

export function BasketRender() {
  const navigate = useNavigate();

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
  return basketItems.length > 0 ? (
    <>
      <div className="basket-items">
        {basketItems.map((item) => (
          <CustomerItemCard key={item.id} item={item} />
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
