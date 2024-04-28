import React from "react";
import { DeliveryFormData } from "../../../types/Types";
import { DeliveryInputs } from "./DeliveryInputs";
import { postDeliveryForm } from "../../../network/SubmitDeliveryFormService";
import { BackButton, ContinueButton } from "../Buttons.tsx";
import {
  useDeliveryContext,
  useDeliveryDispatchContext,
} from "../../../context/DeliveryContext.js";
import { useState } from "react";

interface DeliveryProps {
  handleNextClick: () => void;
  handleBackClick: () => void;
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
  handleNextClick,
  handleBackClick,
}) => {
  const formData = useDeliveryContext();
  const dispatch = useDeliveryDispatchContext();
  if (!dispatch) {
    throw new Error("DeliveryDispatchContext is undefined");
  }

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
    } else {
      setFormStatus(FormStatus.FAILURE);
    }
  };
  const isFormValid = validateForm(formData);

  return (
    <div className="delivery-form">
      <h2>Delivery Information</h2>
      {/* <form id='delivery-form' method="POST" action="https://enoacmo66ykxn.x.pipedream.net"> */}
      <div>
        <form className="delivery-form__form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Enter your delivery information</legend>
            <DeliveryInputs />
            <ContinueButton
              onClick={() => console.log("form is submitting, please wait.")}
              isDisabled={!isFormValid}
            />
            <BackButton onClick={handleBackClick} />
          </fieldset>
        </form>
        {formStatus === FormStatus.SUBMITTING && (
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        )}
        {formStatus === FormStatus.SUCCESS && (
          <div className="overlay">
            <div className="status-icon success">
              <i className="fas fa-check"></i>
            </div>
          </div>
        )}
        {formStatus === FormStatus.FAILURE && (
          <div className="overlay">
            <div className="status-icon failure">
              <i className="fas fa-times"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

//Checking if submiting is allowed
export const validateForm = (formData: DeliveryFormData) => {
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
