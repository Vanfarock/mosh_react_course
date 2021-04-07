import React, { Component } from 'react';

class Counter extends Component {
  render() {
    const {onIncrement, onDecrement, onDelete, counter} = this.props;
    
    return (
      <div className="row">
        <div className="col-1">
          <h4><span className={this.getBadgeClasses()}>{this.formatCount()}</span></h4>
        </div>
        <div className="col">
          <button 
            onClick={() => onIncrement(counter)} 
            className="btn btn-secondary btn-lg m-1">+</button>
          <button 
            onClick={() => onDecrement(counter)} 
            className="btn btn-secondary btn-lg m-1" 
            disabled={counter.value === 0 ? 'disabled' : ''}>-</button>
          <button 
            onClick={() => onDelete(counter.id)} 
            className="btn btn-danger btn-lg m-1">Delete</button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "m-2 badge badge-";
    classes += this.props.counter.value === 0 ? 'warning' : 'primary';
    return classes;
  }

  formatCount() {
    const value = this.props.counter.value;
    return value === 0 ? 'Zero': value;
  }
}

export default Counter;