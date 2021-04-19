import React from 'react';
import Input from './input';

const Searchbox = ({ value, onChange }) => {
  return (
    <Input type="text"
           name="query"
           placeholder="Search..."
           value={value}
           onChange={e => onChange(e.currentTarget.value)} />
  );
}
 
export default Searchbox;