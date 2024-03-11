import React, { useState } from "react";
import { DeliveryFormData} from "../types/Types";
import "../Styles/delivery.css";
import countries from "../countries.tsx";

const DeliveryComponent: React.FC = () => {
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
  });

  const isNotEmpty = (value: string) => value.trim() !== '';

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

  const fetchCityFromZip = async (zipCode: string): Promise<string | undefined> => {
    if (zipCode.length === 4 && (formData.deliveryCountry === "DK" || formData.billingCountry === "DK")) {
      try {
        const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zipCode}`);
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.type === "ResourceNotFoundError") {
            setError(`Zip code ${errorData.details.nr} not found.`);
          } else {
            setError('Failed to fetch city name due to an unexpected error.');
          }
          return undefined;
        }
        const data = await response.json();
        setError(null); // Clear any existing errors on successful fetch
        return data.navn;
      } catch (error) {
        console.error("Failed to fetch city name:", error);
        setError('Failed to fetch city name due to an unexpected error.');
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
    <div className="delivery-form-container">
      <h1>Delivery Information</h1>
      <form>
        {}
        <div className="input-group">
          <label htmlFor="deliveryCountry">Country *</label>
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
        </div>

        {}
        <div className="form-group form-group--flex">
          <div className="input-group">
            <label htmlFor="firstName">First Name *</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
          </div>
        </div>

        {}
        <div className="input-group">
          <label htmlFor="deliveryAddressLine">Address *</label>
          <input
              type="text"
              id="deliveryAddressLine"
              name="deliveryAddressLine"
              value={formData.deliveryAddressLine}
              onChange={handleChange}
          />
        </div>
        {}
        <div className="input-group">
          <label htmlFor="deliveryAddressLine2">Address Line 2</label>
          <input
              type="text"
              id="deliveryAddressLine2"
              name="deliveryAddressLine2"
              value={formData.deliveryAddressLine2}
              onChange={handleChange}
          />
        </div>
        {}
        <div className="input-group">
          <label htmlFor="deliveryZipCode">Zip Code *</label>
          <input
              type="text"
              id="deliveryZipCode"
              name="deliveryZipCode"
              minLength={4}
              maxLength={4}
              value={formData.deliveryZipCode}
              onChange={(e) => handleZipCodeChange(e, "delivery")}
          />
        </div>
        {error && <div className="postal-error-message">{error}</div>}
        {}
        <div className="input-group">
          <label htmlFor="deliveryCity">City *</label>
          <input
              type="text"
              id="deliveryCity"
              name="deliveryCity"
              value={formData.deliveryCity}
              onChange={handleChange}
          />
        </div>
        {}
        <div className="form-group form-group--flex">
          <div className="input-group">
            <label htmlFor="phoneCode">Phone Code? *</label>
            <input
                type="text"
                id="phoneCode"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                readOnly
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone *</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                minLength={8}
                maxLength={8}
                value={formData.phone}
                onChange={handleChange}
            />
          </div>
        </div>
        {}
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
          />
        </div>
        {}
        <div className="form-group form-group--flex">
          <div className="input-group">
            <label htmlFor="companyName"> Company Name</label>
            <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="companyVat">VAT</label>
            <input
                type="text"
                id="companyVat"
                name="companyVat"
                minLength={8}
                maxLength={8}
                value={formData.companyVat}
                onChange={handleChange}
            />
          </div>
        </div>
        {}
        <div className="input-group">
          <input
              type="checkbox"
              id="billingAddressDifferent"
              name="billingAddressDifferent"
              checked={formData.billingAddressDifferent}
              onChange={handleToggleBillingAddress}
          />
          <label htmlFor="billingAddressDifferent">Different billing address</label>
        </div>

        {/*Different billing address */}
        {formData.billingAddressDifferent && (
            <>
              <div className="input-group">
                <label htmlFor="billingCountry">Billing Country *</label>
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
              </div>

              <div className="input-group">
                <label htmlFor="billingZipCode">Billing Zip Code *</label>
                <input
                    type="text"
                    id="billingZipCode"
                    name="billingZipCode"
                    minLength={4}
                    maxLength={4}
                    value={formData.billingZipCode}
                    onChange={(e) => handleZipCodeChange(e, "billing")}
                />
              </div>

              <div className="input-group">
                <label htmlFor="billingCity">Billing City *</label>
                <input
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="billingAddressLine">Billing Address *</label>
                <input
                    type="text"
                    id="billingAddressLine"
                    name="billingAddressLine"
                    value={formData.billingAddressLine}
                    onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="billingAddressLine2">Billing Address Line 2</label>
                <input
                    type="text"
                    id="billingAddressLine2"
                    name="billingAddressLine2"
                    value={formData.billingAddressLine2}
                    onChange={handleChange}
                />
              </div>
            </>
        )}

        {}
        <button type="submit" disabled={!isFormValid}
        >Submit
        </button>
      </form>
    </div>
  );
};

export default DeliveryComponent;
