import React from "react";
import PropTypes from "prop-types";

const FormField = ({
  type,
  name,
  value,
  label,
  placeholder,
  error,
  onChange,
  ...attributes
}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input
        className={`input ${error ? "is-danger" : ""}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...attributes}
      />
      {error ? <p className="help is-danger">{error}</p> : null}
    </div>
  </div>
);

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

FormField.defaultProps = {
  type: "text"
};

export default FormField;
