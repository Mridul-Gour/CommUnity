import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, variant = "default", ...props }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "destructive"]),
};

export default Button;
