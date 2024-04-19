import { BackButton } from "../Buttons.tsx";
import {useBasket} from "../RenditionContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ContentFlow} from "../FlowingContent.tsx";

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
                // Consider removing both handelNext and the items as I don't believe thay are used.
                <Receipt
                    handleBackClick={handleBackClick}
                    items={basketItems} //It is not being used, but will probably soon.
                />
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
