import React from "react";

// Define the props type for the Button component
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Create the Button component
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        backgroundColor: disabled ? "#ccc" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
};

// Export the Button component
export default Button;
