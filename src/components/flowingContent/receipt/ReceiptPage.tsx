
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../RenditionContext.tsx';

const ReceiptPage = () => {
    const { basketItems } = useBasket();
    const navigate = useNavigate();

    useEffect(() => {
        if (basketItems.length === 0) {
            navigate("/");  //Error handling, redirect to home if basket is empty.
        }
    }, [basketItems, navigate]);

    const total = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderNumber = Math.floor(Math.random() * 1000000);  //TODO: Integrate with backend for proper ordernumber (maybe)

    return (
        <div className="receipt-page">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
            <p>Order Number: {orderNumber}</p>
            <ul className="basket-items-list">
                {basketItems.map(item => (
                    <li key={item.id} className="basket-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                        <span className="item-price">{(item.quantity*item.price).toFixed(2)}</span>
                        {item.rebatePercent}, {item.rebateQuantity}
                    </li>
                ))}
            </ul>
            <p>Total: {total.toFixed(2)}</p>
            <button onClick={() => navigate("/")}>Return to Home</button>
        </div>
    );
}

export default ReceiptPage;
