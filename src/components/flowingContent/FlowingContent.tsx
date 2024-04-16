import { useState } from "react";
import { BasketItem, RecurringOrder } from "../../types/Types";
import CustomerItemCard from "./CustomerItemCard";
import { ContinueButton } from "./Buttons";
import { Delivery } from "./delivery/Delivery";
import PaymentPage from "./payment/PaymentPage.tsx";
import { Routes, Route } from "react-router";

export enum ContentFlow {
  Basket,
  Delivery,
  Payment,
  Receipt,
}

interface FlowingContentProps {
  basketItems: BasketItem[];
  setBasketItems: (items: BasketItem[]) => void;
  contentFlow: ContentFlow;
  setContentFlow: (contentFlow: ContentFlow) => void;
}

export function FlowingContent({
  basketItems,
  setBasketItems,
  contentFlow,
  setContentFlow,
}: FlowingContentProps) {
  const [, setIsDeliveryFormValid] = useState(true);
  function handleNextClick() {
    let nextContentFlow: ContentFlow;
    switch (contentFlow) {
      case ContentFlow.Basket:
        nextContentFlow = ContentFlow.Delivery;
        break;
      case ContentFlow.Delivery:
        nextContentFlow = ContentFlow.Payment;
        break;
      case ContentFlow.Payment:
        nextContentFlow = ContentFlow.Receipt;
        break;
      case ContentFlow.Receipt:
        throw new Error(
          "Invalid content flow state, cannot continue from receipt.",
        );
      default:
        throw new Error("Invalid content flow state.");
    }
    setContentFlow(nextContentFlow);
    window.scrollTo(0, 0);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Basket
            basketItems={basketItems}
            setBasketItems={setBasketItems}
            handleNextClick={handleNextClick}
          />
        }
      />
      <Route
        path="/delivery"
        element={
          <Delivery
            setIsDeliveryFormValid={setIsDeliveryFormValid}
            handleNextClick={handleNextClick}
          />
        }
      />
      <Route
        path="/payment"
        element={
          <Payment handleNextClick={handleNextClick} items={basketItems} />
        }
      />
      <Route path="/receipt" element={<Receipt />} />
    </Routes>
  );
}

interface BasketProps {
  basketItems: BasketItem[];
  setBasketItems: (items: BasketItem[]) => void;
  handleNextClick: () => void;
}

function Basket({ basketItems, setBasketItems, handleNextClick }: BasketProps) {
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    const updatedItems = basketItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setBasketItems(updatedItems);
  };

  const handleGiftWrapChange = (itemId: string) => {
    const updatedItems = basketItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, giftWrap: !item.giftWrap };
      }
      return item;
    });
    setBasketItems(updatedItems);
  };

  const handleRecurringOrderChange = (
    itemId: string,
    newRecurringOrder: RecurringOrder,
  ) => {
    if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
      const updatedBasketItems = basketItems.map((item) =>
        item.id === itemId
          ? { ...item, recurringOrder: newRecurringOrder as RecurringOrder }
          : item,
      );
      setBasketItems(updatedBasketItems);
    } else {
      console.error("Invalid recurring order type.");
    }
  };

  const handleRemove = (itemId: string) => {
    setBasketItems(basketItems.filter((item) => item.id !== itemId));
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
      <ContinueButton href="/delivery" onClick={handleNextClick} />
    </>
  ) : (
    <div className="empty-basket-message">
      Your basket is empty. <a href="/browse">Browse more items</a>
    </div>
  );
}

interface PaymentProps {
  handleNextClick: () => void;
  items: BasketItem[];
}

export function Receipt() {
  return <div>receipt :b</div>;
}
function Payment({ handleNextClick, items }: PaymentProps) {
  const [isContinueDisabled, setIsContinueDisabled] = useState(false);
  return (
    <div>
      <PaymentPage items={items} isContinueDisabled={setIsContinueDisabled} />
      <ContinueButton
        isDisabled={isContinueDisabled}
        href="/receipt"
        onClick={handleNextClick}
      />
    </div>
  );
}
