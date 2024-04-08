import {useEffect, useState} from "react";
import InputField from "./InputField.tsx";
import {calculateTotal} from "../../../utils/utilfunctions.tsx";


function GiftCardInputs({onValidated, items}) {
    const [isValid, setIsValid] = useState(false);
    const total = calculateTotal(items);
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('No Gift Card');
    const [newTotal, setNewTotal] = useState('');

    useEffect(() => {
        const regex = /^[A-Za-z0-9]{16}$/; //16 letters or numbers
        setIsValid(regex.test(number));
        const discount = getGiftCardAmount(number)
        onValidated(false);
        setNewTotal(``)
        if(isValid){
            if(discount == 0) setAmount('Gift Card is Invalid');
            else{
                setAmount(`Gift Card Amount: ${discount}`)
                if(total - discount < 0){
                    setNewTotal(`New Total: 0,-`)
                    onValidated(true)
                }
                else setNewTotal(`New Total: ${total - discount},-`)
            }
        }
        else if(number === '') setAmount(' ')
        else setAmount('Gift Card Not Recognised')
    });


    return (

        <div>
            <InputField
                labelText="Gift Card Number"
                onChange={setNumber}
            />
            <p className="payment-paragraph-styling"> {amount}</p>
            <p className="payment-paragraph-styling"> {newTotal}</p>
        </div>
    );
}
export default GiftCardInputs

function getGiftCardAmount(card : String) : number {
    switch (card){
        case '1234abcd5678efgh' : return 500
        case 'iamaveryrichlady' : return 30000
        case 'giveme9999rubies' : return 9999
        default : return 0
    }
}