import { useEffect, useState } from "react";
import InputField from "./InputField.tsx";

interface MobilePayProps {
  onValidated: (isValid: boolean) => void;
}
function MobilePayInputs({ onValidated }: MobilePayProps) {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const regex = /^(?!.* {2}$)\d(?: ?\d){7}$/;
    setIsValid(regex.test(number));
    if (number === "" || isValid) setError("");
    else setError("Number is invalid");
    onValidated(isValid);
  }, [number, isValid, setIsValid, onValidated]);

  return (
    <div>
      <div className="row-container">
        <p className="payment-paragraph-styling">+45</p>
        <InputField labelText="Phone Number" onChange={setNumber} />
      </div>
      <p className="error-paragraph-styling">{error}</p>
    </div>
  );
}

export default MobilePayInputs;
