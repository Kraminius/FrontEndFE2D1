import React from "react";

interface InputFieldProps {
    labelText: string;
    onChange: (value: string) => void; // Callback function to handle input changes
}

const InputField: React.FC<InputFieldProps> = ({ labelText, onChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="payment-input-container">
            <label className="payment-input-label">
                {labelText}
                <input
                    type="text"
                    className="payment-input-box"
                    onChange={handleInputChange}
                />
            </label>
        </div>
    );
}

export default InputField