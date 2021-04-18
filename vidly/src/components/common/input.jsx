import React from 'react';
import { PropTypes } from 'prop-types';

const Input = ({ name, label, error, ...other }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...other} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
}
 
export default Input;