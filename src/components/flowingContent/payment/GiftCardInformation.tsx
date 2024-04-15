import { useEffect, useState } from "react";
import InputField from "./InputField.tsx";
import { calculateTotal } from "../../../utils/utilFunctions.tsx";
import { BasketItem } from "../../../types/Types.ts";

interface GiftCardProps {
  onValidated: (isValid: boolean) => void;
  items: BasketItem[];
}
function GiftCardInputs({ onValidated, items }: GiftCardProps) {
  const [isValid, setIsValid] = useState(false);
  const total = calculateTotal(items);
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("No Gift Card");
  const [newTotal, setNewTotal] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const regex = /^[A-Za-z0-9]{16}$/; //16 letters or numbers
    setIsValid(regex.test(number));
    const discount = getGiftCardAmount(number);
    onValidated(false);
    setNewTotal(``);
    if (isValid) {
      if (discount == 0) {
        setAmount("");
        setError("Gift Card is Invalid");
      } else {
        setAmount(`Gift Card Amount: ${discount}`);
        setError("");
        if (total - discount < 0) {
          setNewTotal(`New Total: 0,-`);
          onValidated(true);
        } else setNewTotal(`New Total: ${total - discount},-`);
      }
    } else if (number === "") {
      setAmount("");
      setError("");
    } else {
      setAmount("");
      setError("Gift Card Not Recognised");
    }
  }, [number, onValidated, isValid, total]);

  return (
    <div>
      <InputField labelText="Gift Card Number" onChange={setNumber} />
      {isValid && (
        <div>
          <p className="payment-paragraph-styling"> {amount}</p>
          <p className="payment-paragraph-styling"> {newTotal}</p>
        </div>
      )}
      {!isValid && <p className="error-paragraph-styling"> {error}</p>}
    </div>
  );
}

export default GiftCardInputs;

function getGiftCardAmount(card: string): number {
  switch (card) {
    case "1234abcd5678efgh":
      return 500;
    case "iamaveryrichlady":
      return 30000;
    case "giveme9999rubies":
      return 9999;
    default:
      return 0;
  }
}
