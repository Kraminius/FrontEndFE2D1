import {SetStateAction, useEffect, useState} from 'react';
import CardInputs from "./CardInformation.tsx";
import MobilePayInputs from "./MobilePayInformation.tsx";
import GiftCardInputs from "./GiftCardInformation.tsx";
import {BasketItem} from "../../../types/Types.ts";
// @ts-ignore
import visa from "../../../images/visa.png";
// @ts-ignore
import mastercard from "../../../images/mastercard.png"
// @ts-ignore
import mobilepay from "../../../images/mobilepay.png"
// @ts-ignore
import bslogo from "../../../images/BS_Logo.png"

interface PaymentPageProps {
    items: BasketItem[];
    isContinueDisabled: (isValid: boolean) => void;
}

function PaymentPage({items, isContinueDisabled}: PaymentPageProps) {
    const [activeOption, setActiveOption] = useState('Cards');
    const [isValid, setIsValid] = useState(false);
    const [isGiftCardValid, setIsGiftCardValid] = useState(false);
    const [isMobilePayValid, setIsMobilePayValid] = useState(false);
    const [isCardValid, setIsCardValid] = useState(false);

    const handleOptionClick = (option: SetStateAction<string>) => {
        setActiveOption(option);
    };
    isContinueDisabled(!isValid);
    useEffect(() => {
        // Check if the currently active option is valid
        switch (activeOption) {
            case 'MobilePay':
                setIsValid(isMobilePayValid || isGiftCardValid);
                break;
            case 'Cards':
                setIsValid(isCardValid || isGiftCardValid);
                break;
            default:
                setIsValid(isGiftCardValid); // No option is active, only if Gift card is enough
        }

    }, [activeOption, isGiftCardValid, isMobilePayValid, isCardValid]); // Dependencies on these states

    return (
        <div id='payment-container'>
            <h2>Payment</h2>
            <h3>Choose a Payment Option</h3>
            <Cards
                open={activeOption === 'Cards'}
                onClick={() => handleOptionClick('Cards')}
                onValidated={setIsCardValid}
            />
            <MobilePay
                open={activeOption === 'MobilePay'}
                onClick={() => handleOptionClick('MobilePay')}
                onValidated={setIsMobilePayValid}
            />
            <h3>Add A Gift Card</h3>
            <GiftCard
                onValidated={setIsGiftCardValid}
                items={items}
            />

        </div>
    );
}

export default PaymentPage;

interface GiftCardProps{
    items: BasketItem[];
    onValidated: (isValid: boolean) => void;
}
function GiftCard({items, onValidated} : GiftCardProps) {
    return (
        <div className={'payment-option-giftcards'} >
            <div className='payment-option-background'>
                <div className='payment-option-aligner'>
                    <div className="payment-option-image">
                        <img src={bslogo} alt="Payment Method"/>
                    </div>
                    <div className="payment-option-title">
                        BuyStuff Giftcard
                    </div>
                </div>
                <div className="payment-card-container">
                    <GiftCardInputs
                        onValidated={onValidated}
                        items={items}/>
                </div>
            </div>
        </div>
    );
}
interface MobilePayProps{
    open : boolean;
    onClick: () => void;
    onValidated: (isValid: boolean) => void;
}
function MobilePay({ open, onClick, onValidated} : MobilePayProps) {
    return (
        <div className={open ? 'payment-option-mobilepay' : 'payment-option-closed'} onClick={onClick}>
            <div className='payment-option-background'>
                <div className='payment-option-aligner'>
                    <div className="payment-option-image">
                        <img src={mobilepay} alt="Payment Method"/>
                    </div>
                    <div className="payment-option-title">
                        MobilePay
                    </div>
                    <div className="payment-option-toggle">
                        {open && <div className="payment-option-toggled"></div>}
                    </div>
                </div>
                {open && <div className="payment-card-container">
                    <MobilePayInputs onValidated={onValidated}/>
                </div>}
            </div>
        </div>
    );
}
interface CardsProps{
    open : boolean;
    onClick: () => void;
    onValidated: (isValid: boolean) => void;
}
function Cards({ open, onClick, onValidated } : CardsProps) {
    return (
        <div className={open ? 'payment-option-cards' : 'payment-option-closed'} onClick={onClick}>
            <div className='payment-option-background'>
                <div className='payment-option-aligner'>
                    <div className="payment-option-image">
                        <img src={visa} alt="Payment Method"/>
                        <img src={mastercard} alt="Payment Method"/>
                    </div>
                    <div className="payment-option-title">
                        Card
                    </div>
                    <div className="payment-option-toggle">
                        {open && <div className="payment-option-toggled"></div>}
                    </div>
                </div>
                {open && <div className="payment-card-container">
                    <CardInputs onValidated={onValidated}/>
                </div>}
            </div>
        </div>
    );
}


