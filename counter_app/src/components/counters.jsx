import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  render() { 
    const {onReset, onDelete, onIncrement, onDecrement, counters} = this.props;

    return (
      <div className="container">
        <button className="btn btn-primary btn-lg m-2"
                onClick={onReset}>Reset</button>
        {counters.map(counter => (
          <Counter key={counter.id} 
                   onDelete={onDelete}
                   onIncrement={onIncrement}
                   onDecrement={onDecrement}
                   counter={counter} />)
        )}
      </div>
    );
  }
}
 
export default Counters;