import React from 'react';
import PropTypes from 'prop-types';

function ListGroup(props) {
  const {items, textProperty, valueProperty, currentItem, onItemChange} = props;
  if (items.length <= 1) return null;

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li key={item[valueProperty] || `${valueProperty}_index`} 
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