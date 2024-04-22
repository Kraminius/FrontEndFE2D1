import { useEffect, useState } from "react";
import { CardInformationForm } from "./PaymentForms.tsx";
import InputField from "./InputField.tsx";
import {
  usePaymentContext,
  usePaymentDispatchContext,
} from "../../../context/PaymentContext.tsx";

interface CardInputsProps {
  onValidated: (isValid: boolean) => void;
}
function CardInputs({ onValidated }: CardInputsProps) {
  const { isCardValid } = usePaymentContext();
  const dispatch = usePaymentDispatchContext();
  const [error, setError] = useState("");
  const [form, setForm] = useState<CardInformationForm>({
    cardHolder: "",
    cardNumber: "",
    expireDate: "",
    cvc: "",
  });
  useEffect(() => {
    const error = validateCardForm(form);
    setError(error);
    dispatch({ type: "SET_IS_CARD_VALID", payload: error === "" });
  }, [form, dispatch]);

  const handleChange =
    (field: keyof CardInformationForm) => (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  useEffect(() => {
    onValidated(isCardValid);
  }, [isCardValid, onValidated]);

  return (
    <div>
      <InputField
        labelText="Cardholder Full Name"
        onChange={handleChange("cardHolder")}
      />
      <InputField
        labelText="Card Number"
        onChange={handleChange("cardNumber")}
      />
      <div className="row-container">
        <InputField labelText="mm/yy" onChange={handleChange("expireDate")} />
        <InputField labelText="CVC/CVV" onChange={handleChange("cvc")} />
      </div>
      <p className="error-paragraph-styling">{error}</p>
    </div>
  );
}

const validateCardForm = (formData: CardInformationForm) => {
  function isEmpty(value: string) {
    return value.trim() == "";
  }
  function isValidFullName(fullName: string): boolean {
    // This regex uses \p{L} to match any kind of letter from any language
    const regex = /^\p{L}+(?: \p{L}+)*$/u;
    return regex.test(fullName);
  }
  function isValidCardNumber(cardNumber: string): boolean {
    //16 digits, can have spacebar or '-' between every four numbers.
    const regex = /^(?:\d{4}-){3}\d{4}$|^(?:\d{4} ){3}\d{4}$|^\d{16}$/;
    return regex.test(cardNumber);
  }
  function isValidExpiryDate(expiryDate: string): boolean {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!regex.test(expiryDate)) {
      return false; // The format is incorrect
    }
    const [month, year] = expiryDate.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100; // get current year (last two digits)
    const currentMonth = new Date().getMonth() + 1; // current month (+1 because it starts at 1 for january)
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      //Has date passed
      return false;
    }
    return true;
  }
  function isValidCVC(num: string): boolean {
    // This regex matches exactly three digits
    const regex = /^\d{3}$/;
    return regex.test(num);
  }

  if (isEmpty(formData.cardHolder)) return " ";
  if (!isValidFullName(formData.cardHolder)) return "Name is not valid";
  if (isEmpty(formData.cardNumber)) return " ";
  if (!isValidCardNumber(formData.cardNumber)) return "Cardnumber is not valid";
  if (isEmpty(formData.expireDate)) return " ";
  if (!isValidExpiryDate(formData.expireDate))
    return "Expire date is not valid";
  if (isEmpty(formData.cvc)) return " ";
  if (!isValidCVC(formData.cvc)) return "CVC/CVV is not valid";
  return "";
};

export default CardInputs;
