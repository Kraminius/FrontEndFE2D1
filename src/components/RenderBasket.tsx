import CustomerItemCard from "./CustomerItemCard.tsx";
import {ContinueButton} from "./reusable_components/Buttons.tsx";

return basketItems.length > 0 ? (
    <>
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
        <ContinueButton onClick={handleNextClick} isDisabled={!isDeliveryFormValid} />
    </>
) : (
    <div className="empty-basket-message">
        Your basket is empty. <a href="/browse">Browse more items</a>
    </div>
);