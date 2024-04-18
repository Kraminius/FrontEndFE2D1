import { useState } from "react";
import {BasketItem, ContentFlow, RecurringOrder} from "../../types/Types";
import CustomerItemCard from "./CustomerItemCard";
import { BackButton, ContinueButton } from "./Buttons";
import { Delivery } from "./delivery/Delivery";
import PaymentPage from "./payment/PaymentPage.tsx";



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
          "Invalid content flow state, cannot continue from receipt."
        );
      default:
        throw new Error("Invalid content flow state.");
    }
    setContentFlow(nextContentFlow);
    window.scrollTo(0, 0);
  }
  function handleBackClick() {
    let nextContentFlow: ContentFlow;
    switch (contentFlow) {
      case ContentFlow.Basket:
        throw new Error(
          "Invalid content flow state, cannot go back from basket."
        );
      case ContentFlow.Delivery:
        nextContentFlow = ContentFlow.Basket;
        break;
      case ContentFlow.Payment:
        nextContentFlow = ContentFlow.Delivery;
        break;
      case ContentFlow.Receipt:
        nextContentFlow = ContentFlow.Payment;
        break;
      default:
        throw new Error("Invalid content flow state.");
    }
    setContentFlow(nextContentFlow);
    window.scrollTo(0, 0);
  }

  switch (contentFlow) {
    case ContentFlow.Basket:
      return (
        <Basket
          basketItems={basketItems}
          setBasketItems={setBasketItems}
          handleNextClick={handleNextClick}
        />
      );
    case ContentFlow.Delivery:
      return (
        <Delivery
          setIsDeliveryFormValid={setIsDeliveryFormValid}
          handleNextClick={handleNextClick}
          handleBackClick={handleBackClick}
        />
      );
    case ContentFlow.Payment:
      return (
        <Payment
          handleNextClick={handleNextClick}
          handleBackClick={handleBackClick}
          items={basketItems}
        />
      );
    case ContentFlow.Receipt:
      return <Receipt handleBackClick={handleBackClick} />;
  }
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
    newRecurringOrder: RecurringOrder
  ) => {
    if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
      const updatedBasketItems = basketItems.map((item) =>
        item.id === itemId
          ? { ...item, recurringOrder: newRecurringOrder as RecurringOrder }
          : item
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
      <ContinueButton onClick={handleNextClick} />
    </>
  ) : (
    <div className="empty-basket-message">
      Your basket is empty. <a href="/browse">Browse more items</a>
    </div>
  );
}

interface PaymentProps {
  handleNextClick: () => void;
  handleBackClick: () => void;
  items: BasketItem[];
}

function Receipt({ handleBackClick }: { handleBackClick: () => void }) {
  return (
    <div>
      receipt :b
      <BackButton onClick={handleBackClick} />
    </div>
  );
}
function Payment({ handleNextClick, handleBackClick, items }: PaymentProps) {
  const [isContinueDisabled, setIsContinueDisabled] = useState(false);
  return (
    <div>
      <PaymentPage items={items} isContinueDisabled={setIsContinueDisabled} />
      <ContinueButton
        onClick={handleNextClick}
        isDisabled={isContinueDisabled}
      />
      <BackButton onClick={handleBackClick} />
    </div>
  );
}
