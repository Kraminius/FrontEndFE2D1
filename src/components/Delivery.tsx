import React, { useState } from "react";
import { DeliveryFormData } from "../types/Types";
import "../Styles/delivery.css";
import countries from "../countries.tsx";

interface DeliveryComponentProps {
  onFormValidityChange: (isValid: boolean) => void;
}

const DeliveryComponent: React.FC<DeliveryComponentProps> = ({
  onFormValidityChange,
}) => {
  const [error, setError] = useState<string | null>(null);
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
  });

  const isNotEmpty = (value: string) => value.trim() !== "";

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@(?![.-])[^\s@]+\.[^\s@]+(?<!\.)$/;
    return regex.test(email);
  };

  //Checking if submiting is allowed
  const validateForm = () => {
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

  const isFormValid = validateForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    addressType: "delivery" | "billing"
  ) => {
    const newZipCode = e.target.value;
    if (addressType === "delivery") {
      setFormData({ ...formData, deliveryZipCode: newZipCode });
      if (newZipCode.length === 4 && formData.deliveryCountry === "DK") {
        const newCityName = await fetchCityFromZip(newZipCode);
        setFormData((prevFormData) => ({
          ...prevFormData,
          deliveryCity: newCityName || "",
        }));
      }
    } else if (addressType === "billing") {
      setFormData({ ...formData, billingZipCode: newZipCode });
      if (newZipCode.length === 4 && formData.billingCountry === "DK") {
        const newCityName = await fetchCityFromZip(newZipCode);
        setFormData((prevFormData) => ({
          ...prevFormData,
          billingCity: newCityName || "",
        }));
      }
    }
  };

  const fetchCityFromZip = async (
    zipCode: string
  ): Promise<string | undefined> => {
    if (
      zipCode.length === 4 &&
      (formData.deliveryCountry === "DK" || formData.billingCountry === "DK")
    ) {
      try {
        const response = await fetch(
          `https://api.dataforsyningen.dk/postnumre/${zipCode}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.type === "ResourceNotFoundError") {
            setError(`Zip code ${errorData.details.nr} not found.`);
          } else {
            setError("Failed to fetch city name due to an unexpected error.");
          }
          return undefined;
        }
        const data = await response.json();
        setError(null); // Clear any existing errors on successful fetch
        return data.navn;
      } catch (error) {
        console.error("Failed to fetch city name:", error);
        setError("Failed to fetch city name due to an unexpected error.");
        return undefined;
      }
    }
    return "";
  };
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const selectedCountryData = countries.find(
      (country) => country.code === selectedCountry
    );

    if (selectedCountryData) {
      setFormData((prev) => ({
        ...prev,
        deliveryCountry: selectedCountry,
        phoneCode: selectedCountryData.phoneCode,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        deliveryCountry: "",
        phoneCode: "",
      }));
    }
  };
  const handleToggleBillingAddress = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      billingAddressDifferent: !prevFormData.billingAddressDifferent,
    }));
  };

  return (
    onFormValidityChange(isFormValid),
    (
      <div className="delivery-form-container">
        <h1>Delivery Information</h1>
        <form method="POST" action="https://enoacmo66ykxn.x.pipedream.net">
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
          <div className="form-group form-group--flex">
            <TextInput
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              placeholder=""
            >
              Phone Code *
            </TextInput>

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
          <hr />
          <CheckBox
            isChecked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData({ ...formData, agreeToTerms: e.target.checked })
            }
            name={"agreeToTerms"}
          >
            I agree to terms of service
          </CheckBox>

          <CheckBox
            isChecked={formData.agreeToMarketing}
            onChange={(e) =>
              setFormData({ ...formData, agreeToMarketing: e.target.checked })
            }
            name={"agreeToMarketing"}
          >
            I agree to recieve marketing emails
          </CheckBox>
          <input type="submit" value="Submit" disabled={!isFormValid} />
        </form>
      </div>
    )
  );
};

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

export default DeliveryComponent;
