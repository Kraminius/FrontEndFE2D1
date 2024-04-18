import { useState } from "react";
import { BasketItem, RecurringOrder } from "../../types/Types";
import CustomerItemCard from "./CustomerItemCard";
import { BackButton, ContinueButton } from "./Buttons";
import { Delivery } from "./delivery/Delivery";
import PaymentPage from "./payment/PaymentPage.tsx";
import {BasketProvider, useBasketContext, useBasketDispatchContext} from '../../context/BasketContext';


export enum ContentFlow {
  Basket,
  Delivery,
  Payment,
  Receipt,
}

interface FlowingContentProps {
  contentFlow: ContentFlow;
  setContentFlow: (contentFlow: ContentFlow) => void;
}

export function FlowingContent({
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
  function handleBackClick() {
    let nextContentFlow: ContentFlow;
    switch (contentFlow) {
      case ContentFlow.Basket:
        throw new Error(
          "Invalid content flow state, cannot go back from basket.",
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
          <Basket handleNextClick={handleNextClick} />
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
  handleNextClick: () => void;
}

function Basket({ handleNextClick }: BasketProps) {
  const basketItems = useBasketContext();
  const dispatch = useBasketDispatchContext();
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, newQuantity } });
  };

  const handleGiftWrapChange = (itemId: string) => {
    dispatch({ type: 'TOGGLE_GIFT_WRAP', payload: { itemId } });
    };

  const handleRecurringOrderChange = (
      itemId: string,
      newRecurringOrder: RecurringOrder,
  ) => {
    if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
      dispatch({ type: 'UPDATE_RECURRING_ORDER', payload: { itemId, newRecurringOrder } });
    } else {
      console.error("Invalid recurring order type.");
    }
  };

  const handleRemove = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
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
