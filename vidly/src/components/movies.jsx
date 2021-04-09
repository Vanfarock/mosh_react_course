import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';

class Movies extends Component {
  constructor() {
    super();
    
    this.state = {
      pageSize: 5,
      movies: [],
      genres: [],
      currentPage: 1,
    };
  }

  componentDidMount() {
    const currentGenre ={name: 'All Genres'};
    const genres = [currentGenre, ...getGenres()];
    
    this.setState({
      movies: getMovies(),
      currentGenre,
      genres
    })
  }

  render() { 
    const {pageSize, currentPage, movies: allMovies, genres, currentGenre} = this.state;

    if (allMovies.length === 0) {
      return (
        <p>There are no movies in the database</p>
      );
    }

    const filtered = currentGenre && currentGenre._id
        ? allMovies.filter(item => item.genre._id === currentGenre._id) 
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        {genres.length > 1 && 
        <div className="col-lg-3">
          <ListGroup items={genres}
                     currentItem={currentGenre}
                     onItemChange={this.handleGenreChange} />
        </div>}
        
        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>
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
          <Pagination itemsCount={filtered.length}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }

  handleGenreChange = genre => {
    this.setState({
      currentGenre: genre,
      currentPage: 1
    });
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