import { BackButton } from "../Buttons.tsx";
import {useBasket} from "../RenditionContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ContentFlow} from "../FlowingContent.tsx";
import ReceiptPage from "../receipt/ReceiptPage.tsx";

export function ReceiptRender() {

    const { basketItems, setContentFlow } = useBasket()
    const navigate = useNavigate();



    useEffect(() => {
        setContentFlow(ContentFlow.Receipt);
    }, [setContentFlow]);


    function handleBackClick() {
        navigate("/payment");
        window.scrollTo(0, 0);
    }

            return (
                <div>
                <ReceiptPage
                    items={basketItems}
                />
                </div>
            );
}

function Receipt({ handleBackClick }: { handleBackClick: () => void }) {
    return (
        <div>
            receipt :b
            <BackButton onClick={handleBackClick} />
        </div>
    );
}

export default ReceiptRender;
