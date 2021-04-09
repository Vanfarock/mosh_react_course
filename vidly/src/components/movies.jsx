import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';

class Movies extends Component {
  state = {
    pageSize: 5,
    movies: getMovies(),
    currentPage: 1
  };

  render() { 
    const {pageSize, currentPage, movies: allMovies} = this.state;
    const count = allMovies.length;

    if (count === 0) {
      return (
        <p>There are no movies in the database</p>
      );
    }

    const movies = paginate(allMovies, currentPage, pageSize);

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
            {movies.map(movie => (
              <tr key={movie._id}>
                <td className="align-middle">{ movie.title }</td>
                <td className="align-middle">{ movie.genre.name }</td>
                <td className="align-middle">{ movie.numberInStock }</td>
                <td className="align-middle">{ movie.dailyRentalRate }</td>
                <td className="align-middle"><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                <td className="align-middle">
                  <button className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(movie)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange} />
      </>
    );
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]}
    movies[index].liked = !movies[index].liked;
    
    this.setState({
      movies
    });
  }

  handleDelete = (movie) => {
    this.setState({
      movies: this.state.movies.filter(m => m !== movie)
    });
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page
    });
  }
}
 
export default Movies;