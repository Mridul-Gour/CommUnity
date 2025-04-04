import React from "react";
import PropTypes from "prop-types";

const Textarea = ({ name, value, onChange, placeholder }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
      rows="4"
    ></textarea>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Textarea;
