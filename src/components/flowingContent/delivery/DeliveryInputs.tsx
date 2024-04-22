import React, { useState } from "react";
import countries from "./countries";
import { useDeliveryDispatchContext, useDeliveryContext } from "../../../context/DeliveryContext";




export function DeliveryInputs() {

  const formData = useDeliveryContext();
  const dispatch = useDeliveryDispatchContext();
  if (!dispatch) {
    throw new Error('DeliveryDispatchContext is undefined');
  }
  const [error, setError] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name == "phone" && value && !/^\d+$/.test(value)) return;
    dispatch({ type: "SET_FORM_DATA", payload: { ...formData, [name]: value } });

    //setFormData((prev) => ({...prev, [name]: value, }));
  };
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const selectedCountryData = countries.find(
      (country) => country.code === selectedCountry,
    );

    if (selectedCountryData) {
      dispatch({
        type: 'SET_FORM_DATA',
        payload: {
          ...formData,
          billingAddressDifferent: !formData.billingAddressDifferent,
        },
      });
    }
  };

  const handleToggleBillingAddress = () => {
    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        ...formData,
        billingAddressDifferent: !formData.billingAddressDifferent,
      },
    });
  };
  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    addressType: "delivery" | "billing"
  ) => {
    const newZipCode = e.target.value;
  
    if (!/^\d*$/.test(newZipCode)) return;
  
    // We need to update the local state for delivery or billing based on addressType first
    let newFormData = { ...formData };
    if (addressType === 'delivery') {
      newFormData.deliveryZipCode = newZipCode;
    } else if (addressType === 'billing') {
      newFormData.billingZipCode = newZipCode;
    }
  
    // Dispatch the new zip code
    dispatch({
      type: 'SET_FORM_DATA',
      payload: newFormData,
    });
  
    // Check for the condition and country code, then fetch city name
    // If we dont spread it out the async part fucks everything up
    if (newZipCode.length === 4 && newFormData[`${addressType}Country`] === "DK") {
      const newCityName = await fetchCityFromZip(newZipCode);
      dispatch({
        type: 'SET_FORM_DATA',
        payload: {
          ...newFormData,
          [`${addressType}City`]: newCityName || "",
        },
      });
    }
  };
  

  

  const fetchCityFromZip = async (
    zipCode: string,
  ): Promise<string | undefined> => {
    if (
      zipCode.length === 4 &&
      (formData.deliveryCountry === "DK" || formData.billingCountry === "DK")
    ) {
      try {
        const response = await fetch(
          `https://api.dataforsyningen.dk/postnumre/${zipCode}`,
        );
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.type === "ResourceNotFoundError") {
            setError(`Zip code ${errorData.details.nr} not found.`);
          } else if (errorData.type === "ResourcePathFormatError") {
            setError(`Zip code is ill formed.`);
          }
          return undefined;
        }
        const data = await response.json();
        setError(null); // Clear any existing errors on successful fetch
        return data.navn;
      } catch (error) {
        console.error("Failed to fetch city name: ", error);
        const errorTest = `Failed to fetch city name due to: ${error}`;
        setError(errorTest);
        return undefined;
      }
    }
    return "";
  };
  return (
    <>
      <Label>
        Country
        <select
          id="deliveryCountry"
          name="deliveryCountry"
          value={formData.deliveryCountry}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </Label>
      <div className="form-group form-group--flex">
        <TextInput
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        >
          First Name *
        </TextInput>

        <TextInput
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        >
          Last Name *
        </TextInput>
      </div>

      <TextInput
        name="deliveryAddressLine"
        value={formData.deliveryAddressLine}
        onChange={handleChange}
        placeholder="Address"
      >
        Address *
      </TextInput>
      <TextInput
        name="deliveryAddressLine2"
        value={formData.deliveryAddressLine2}
        onChange={handleChange}
        placeholder="Secondary Address"
      >
        Address Line 2
      </TextInput>
      <NumberInput
        name="deliveryZipCode"
        value={formData.deliveryZipCode}
        onChange={(e) => handleZipCodeChange(e, "delivery")}
        length={4}
        placeholder="Zip Code"
      >
        Zip Code *
      </NumberInput>
      {error && <div className="postal-error-message">{error}</div>}
      <TextInput
        name="deliveryCity"
        value={formData.deliveryCity}
        onChange={handleChange}
        placeholder="City"
      >
        City *
      </TextInput>
      <div className="phone-input-group">
        <div className="input-group phone-code">
          <TextInput
            name="phoneCode"
            value={formData.phoneCode}
            readOnly={true}
            onChange={handleChange}
            placeholder=""
          >
            Phone Code *
          </TextInput>
        </div>
        <div className="input-group phone-number">
          <NumberInput
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            length={8}
            placeholder="Phone Number"
          >
            Phone *
          </NumberInput>
        </div>
      </div>
      <TextInput
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      >
        Email *
      </TextInput>
      <div className="form-group form-group--flex">
        <TextInput
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company"
        >
          Company Name
        </TextInput>

        <NumberInput
          name="companyVat"
          value={formData.companyVat}
          onChange={handleChange}
          length={8}
          placeholder="VAT"
        >
          VAT
        </NumberInput>
      </div>

      <CheckBox
        isChecked={formData.billingAddressDifferent}
        onChange={handleToggleBillingAddress}
        name={"billingAddressDifferent"}
      >
        Different billing address
      </CheckBox>
      {formData.billingAddressDifferent && (
        <>
          <Label>
            Billing Country
            <select
              id="billingCountry"
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleChange}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </Label>

          <NumberInput
            name="billingZipCode"
            value={formData.billingZipCode}
            onChange={(e) => handleZipCodeChange(e, "billing")}
            length={4}
            placeholder="Zip Code"
          >
            Billing Zip Code *
          </NumberInput>

          <TextInput
            name="billingCity"
            value={formData.billingCity}
            onChange={handleChange}
            placeholder="City"
          >
            Billing City *
          </TextInput>

          <TextInput
            name="billingAddressLine"
            value={formData.billingAddressLine}
            onChange={handleChange}
            placeholder="Address"
          >
            Billing Address *
          </TextInput>

          <TextInput
            name="billingAddressLine2"
            value={formData.billingAddressLine2}
            onChange={handleChange}
            placeholder="Secondary Address"
          >
            Billing Address Line 2
          </TextInput>
        </>
      )}
      <Label>
        {" "}
        Add delivery message:
        <textarea
          id="deliveryMessage"
          name="deliveryMessage"
          rows={5}
          cols={33}
          value={formData.deliveryMessage}
          onChange={handleChange}
        ></textarea>
      </Label>
      <hr />
      <CheckBox
        isChecked={formData.agreeToTerms}
        onChange={(e) =>
          dispatch({
            type: 'SET_FORM_DATA',
            payload: { ...formData, agreeToTerms: e.target.checked },
          })
        }
        name={"agreeToTerms"}
      >
        I agree to terms of service
      </CheckBox>

      <CheckBox
        isChecked={formData.agreeToMarketing}
        onChange={(e) =>
          dispatch({
            type: 'SET_FORM_DATA',
            payload: { ...formData, agreeToMarketing: e.target.checked },
          })
        }
        name={"agreeToMarketing"}
      >
        I agree to recieve marketing emails
      </CheckBox>
    </>
  );
}

//Checking if submiting is allowed

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  children: React.ReactNode;
}

function CheckBox({ children, isChecked, onChange, name }: CheckBoxProps) {
  return (
    <div className="input-group">
      <label style={{ display: "flex", alignItems: "center" }}>
        {children}
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  readOnly?: boolean;
  children: React.ReactNode;
}

interface NumberInputProps extends TextInputProps {
  length: number;
}

function NumberInput({
  children,
  value,
  onChange,
  name,
  placeholder = "",
  length,
}: NumberInputProps) {
  return (
    <Label>
      {children}
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength={length}
        maxLength={length}
      />
    </Label>
  );
}

function TextInput({
  children,
  value,
  onChange,
  name,
  placeholder = "",
  readOnly = false,
}: TextInputProps) {
  return (
    <Label>
      {children}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </Label>
  );
}

interface LabelProps {
  children: React.ReactNode;
}
function Label({ children }: LabelProps) {
  return (
    <div className="input-group">
      <label>{children}</label>
    </div>
  );
}
