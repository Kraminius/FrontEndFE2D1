import {useEffect, useState} from "react";
import { BackButton, ContinueButton } from "../Buttons.tsx";
import {useBasket} from "../RenditionContext.tsx";
import PaymentPage from "../payment/PaymentPage.tsx";
import {useNavigate} from "react-router-dom";
import {ContentFlow} from "../FlowingContent.tsx";

export function PaymentRender() {

    //const { basketItems, setBasketItems, contentFlow, setContentFlow } = useBasket();
    const { basketItems,  setContentFlow } = useBasket();
    const navigate = useNavigate();
    const [isContinueDisabled, setIsContinueDisabled] = useState(false);

    useEffect(() => {
        setContentFlow(ContentFlow.Payment);
    }, [setContentFlow]);

    function handleNextClick() {
        navigate("/receipt");
        window.scrollTo(0, 0);

    }
    function handleBackClick() {
        navigate("/delivery");
        window.scrollTo(0, 0);
    }

            return (
                <div>
                    <PaymentPage items={basketItems} isContinueDisabled={setIsContinueDisabled}/>
                    <ContinueButton
                        onClick={handleNextClick}
                        isDisabled={isContinueDisabled}
                    />
                    <BackButton onClick={handleBackClick}/>
                </div>
            );
}


/*

interface PaymentProps {
    handleNextClick: () => void;
    handleBackClick: () => void;
    items: BasketItem[];
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

 */

export default PaymentRender;
