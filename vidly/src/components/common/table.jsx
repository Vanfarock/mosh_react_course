import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';


const Table = ({columns, sortColumn, onSort, data}) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover border">
        <TableHeader columns={columns} 
                      sortColumn={sortColumn} 
                      onSort={onSort}/>
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Table;