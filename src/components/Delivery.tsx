import React, { useState } from "react";
import { DeliveryFormData, PostalData } from "../types/Types";
import "../Styles/delivery.css";
import countries from "../countries.tsx";

const DeliveryComponent: React.FC = () => {
  const [formData, setFormData] = useState<DeliveryFormData>({
    deliveryCountry: "DK",
    deliveryZipCode: "",
    deliveryCity: "",
    deliveryAddressLine: "",
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
  });

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
    if (zipCode.length === 4) {
      try {
        const response = await fetch(
          `https://api.dataforsyningen.dk/postnumre/${zipCode}`
        );
        const data: PostalData = await response.json();
        return data.navn;
      } catch (error) {
        console.error("Failed to fetch city name:", error);
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
            <label htmlFor="firstName">Fornavn *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Efternavn *</label>
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
          <label htmlFor="deliveryZipCode">Zip Code *</label>
          <input
            type="text"
            id="deliveryZipCode"
            name="deliveryZipCode"
            value={formData.deliveryZipCode}
            onChange={(e) => handleZipCodeChange(e, "delivery")}
          />
        </div>
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
          <label htmlFor="billingAddressDifferent"></label>
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
          </>
        )}

        {}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DeliveryComponent;
