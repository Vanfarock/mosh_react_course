import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from './common/table';
import Like from './common/like';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title', 
      label:'Title', 
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    {path: 'genre.name', label:'Genre'},
    {path: 'numberInStock', label:'Stock'},
    {path: 'dailyRentalRate', label:'Rate'},
    {
      key: 'like', 
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    },
    {
      key: 'delete', 
      content: movie => (
        <button 
          className="btn btn-danger btn-sm" 
          onClick={() => this.props.onDelete(movie)}>Delete</button>)
    }
  ]

  render() { 
    const {movies, onSort, sortColumn} = this.props;

    return (
      <Table columns={this.columns}
             data={movies}
             sortColumn={sortColumn}
             onSort={onSort} />
    );
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object
}

export default MoviesTable;