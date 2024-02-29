//import CustomerItem from "./components/CustomerItem";
import BasketSummary from "./components/BasketSummary";
import { RecurringOrder } from "./types/Types";
import initialBasketItems from "./data";
import { useState } from "react";
import "./Styles/index.css";
import Footer from "./components/Footer";
import CustomerItemCard from "./components/CustomerItemCard.tsx";
import PromotionCard from "./components/PromotionCard.tsx";
import DeliveryComponent from "./components/Delivery.tsx";
const creatorNames = [
  "Christensen, Nicklas Thorbjørn",
  "Gørlyk, Tobias Pedersen",
  "Hansen, Jakob Lars Naur",
  "Jürs, Mikkel",
  "Rolsted, Frederik Emil",
  "Zenkert, Henrik Albert Erik",
];

//const headerNames = ["Type", " ,- /stk.", "Quantity", "Sum", "Options"];
function App() {
  const [basketItems, setBasketItems] = useState(initialBasketItems);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
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

  const handleGiftWrapChange = (itemId: number) => {
    const updatedItems = basketItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, giftWrap: !item.giftWrap };
      }
      return item;
    });
    setBasketItems(updatedItems);
  };

  const handleRecurringOrderChange = (
    itemId: number,
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

  const handleRemove = (itemId: number) => {
    setBasketItems(basketItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <h1>Shopping Basket</h1>
      <div className="page-container">
        <div className="basket-container">
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
        <div className="user-info-container">
          <div className="address-container">
            <div className="filler"></div>
          </div>

          <div className="promotion-box">
            <div className="title-card">See Also</div>
            <div className="promotion-container">
              {basketItems.map((item) => (
                <PromotionCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BasketSummary items={basketItems} />
      <DeliveryComponent />
      <Footer creatorNames={creatorNames} />
    </div>
  );
}

/*
interface HeaderProps {
  headerNames: string[];
}

function Header({ headerNames }: HeaderProps) {
  return (
    <thead>
      <tr>
        {headerNames.map((headerName: string) => (
          <th key={headerName}>{headerName}</th>
        ))}
      </tr>
    </thead>
  );
}
*/
export default App;
