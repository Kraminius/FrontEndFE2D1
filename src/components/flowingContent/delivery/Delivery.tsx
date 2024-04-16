import React, { useEffect, useState } from "react";
import { DeliveryFormData } from "../../../types/Types";
import { DeliveryInputs } from "./DeliveryInputs";
import { postDeliveryForm } from "../../../network/SubmitDeliveryFormService";
import { ContinueButton } from "../Buttons.tsx";
import { useNavigate } from "react-router";

interface DeliveryProps {
  setIsDeliveryFormValid: (isValid: boolean) => void;
  handleNextClick: () => void;
}

// view requests here
// https://public.requestbin.com/r/enoacmo66ykxn
const FORM_POST_URL = "https://enoacmo66ykxn.x.pipedream.net";

enum FormStatus {
  NOT_SUBMITTED,
  SUBMITTING,
  SUCCESS,
  FAILURE,
}

export const Delivery: React.FC<DeliveryProps> = ({
  setIsDeliveryFormValid,
  handleNextClick,
}) => {
  const [formData, setFormData] = useState<DeliveryFormData>({
    deliveryCountry: "DK",
    deliveryZipCode: "",
    deliveryCity: "",
    deliveryAddressLine: "",
    deliveryAddressLine2: "",
    firstName: "",
    lastName: "",
    phoneCode: "+45",
    phone: "",
    email: "",
    companyName: "",
    companyVat: "",
    billingAddressDifferent: false,
    billingCountry: "DK",
    billingZipCode: "",
    billingCity: "",
    billingAddressLine: "",
    billingAddressLine2: "",
    agreeToTerms: false,
    agreeToMarketing: true,
    deliveryMessage: "",
  });

  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState<FormStatus>(
    FormStatus.NOT_SUBMITTED,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setFormStatus(FormStatus.SUBMITTING);
    e.preventDefault();

    const status = await postDeliveryForm(FORM_POST_URL, formData);

    if (status === 200) {
      setFormStatus(FormStatus.SUCCESS);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      handleNextClick();
      navigate("/payment");
    } else {
      setFormStatus(FormStatus.FAILURE);
    }
  };
  const isFormValid = validateForm(formData);

  useEffect(() => {
    setIsDeliveryFormValid(isFormValid);
  }, [isFormValid, setIsDeliveryFormValid]);

  return (
    <div className="delivery-form">
      <h2>Delivery Information</h2>
      <form className="delivery-form__form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter your delivery information</legend>
          <DeliveryInputs formData={formData} setFormData={setFormData} />
          <ContinueButton isDisabled={!isFormValid} />
        </fieldset>
      </form>
      {formStatus === FormStatus.SUBMITTING && (
        <p className="delivery-form__status delivery-form__status--submitting">
          ⌛ Form is being submitted. ⌛
        </p>
      )}
      {formStatus === FormStatus.SUCCESS && (
        <p className="delivery-form__status delivery-form__status--success">
          Form submitted successfully
        </p>
      )}
      {formStatus === FormStatus.FAILURE && (
        <p className="delivery-form__status delivery-form__status--failure">
          Form submission failed
        </p>
      )}
    </div>
  );
};

//Checking if submiting is allowed
const validateForm = (formData: DeliveryFormData) => {
  function isNotEmpty(value: string) {
    return value.trim() !== "";
  }

  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@(?![.-])[^\s@]+\.[^\s@]+(?<!\.)$/;
    return regex.test(email);
  }

  if (!isNotEmpty(formData.deliveryCountry)) return false;
  if (formData.deliveryZipCode.length !== 4) return false;
  if (!isNotEmpty(formData.deliveryCity)) return false;
  if (!isNotEmpty(formData.deliveryAddressLine)) return false;
  if (!isNotEmpty(formData.firstName)) return false;
  if (!isNotEmpty(formData.lastName)) return false;
  if (formData.phone.length !== 8) return false;
  if (!isValidEmail(formData.email)) return false;
  if (!formData.agreeToTerms) return false;

  if (formData.billingAddressDifferent) {
    if (formData.billingZipCode.length !== 4) return false;
    if (!isNotEmpty(formData.billingCountry)) return false;
    if (!isNotEmpty(formData.billingCity)) return false;
    if (!isNotEmpty(formData.billingAddressLine)) return false;
  }

  return true;
};
