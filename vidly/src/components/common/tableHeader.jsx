import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';


class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = {...this.props.sortColumn};
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc': 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  }

  renderSortIcon = column => {
    const sortColumn = {...this.props.sortColumn};
    if (column.path !== sortColumn.path || !column.path) return null;
    
    return <FontAwesomeIcon icon={sortColumn.order === 'asc' ? faSortUp : faSortDown} />
  }

  render() { 
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => 
            <th key={column.path || column.key} 
                onClick={() => this.raiseSort(column.path)}
                className="col text-nowrap"
                role="button"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          )}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
}
 
export default TableHeader;