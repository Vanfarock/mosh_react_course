import React from 'react';
import { PropTypes } from 'prop-types';

const Combobox = ({name, label, options, error, ...other}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="control-label">{label}</label>
      <div>
        <select className="form-control" 
                id={name} 
                name={name}  
                onChange={e => this.handleChange(e)}
                {...other}>
          {options && options.map(option => (
            <option key={option.value} value={option.value}>{option.name}</option>  
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

Combobox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string
}
 
export default Combobox;