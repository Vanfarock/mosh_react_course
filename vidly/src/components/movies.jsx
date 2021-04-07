import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';

class Movies extends Component {
  state = { 
    movies: getMovies(),
  };

  render() { 
    const count = this.state.movies.length;

    if (count === 0) {
      return (
        <p>There are no movies in the database</p>
      );
    }

    return (
      <>
        <p>Showing {count} movies in the database</p>
        <table className="table table-striped table-hover border">
          <thead>
            <tr>
              <th className="col">Title</th>
              <th className="col">Genre</th>
              <th className="col">Stock</th>
              <th className="col">Rate</th>
              <th className="col"></th>
              <th className="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td className="align-middle">{ movie.title }</td>
                <td className="align-middle">{ movie.genre.name }</td>
                <td className="align-middle">{ movie.numberInStock }</td>
                <td className="align-middle">{ movie.dailyRentalRate }</td>
                <td className="align-middle">{ movie.dailyRentalRate }</td>
                <td className="align-middle"><Like /></td>
                <td className="align-middle">
                  <button className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(movie._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  handleDelete = (movieId) => {
    this.setState({
      movies: this.state.movies.filter(m => m._id !== movieId)
    });
  }
}
 
export default Movies;