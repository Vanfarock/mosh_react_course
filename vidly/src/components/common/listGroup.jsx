import React from 'react';
import PropTypes from 'prop-types';

function ListGroup({items, textProperty, valueProperty, currentItem, onItemChange}) {
  if (items.length <= 1) return null;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li key={item[valueProperty]} 
            className={item === currentItem ? 'list-group-item active' : 'list-group-item'}
            onClick={() => onItemChange(item)}
            role="button">{item[textProperty]}</li>  
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  currentItem: PropTypes.object,
  onItemChange: PropTypes.func.isRequired
}

export default ListGroup;