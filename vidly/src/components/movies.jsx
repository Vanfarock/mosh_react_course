import React, { Component } from 'react';
import { getMovies, saveMovie, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: {
      path: 'title',
      order: 'asc'
    }
  };

  componentDidMount() {
    const currentGenre ={_id: '', name: 'All Genres'};
    const genres = [currentGenre, ...getGenres()];
    
    this.setState({
      movies: getMovies(),
      currentGenre,
      genres
    })
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
    const updatedMovie = {...movies[index]};
    updatedMovie.liked = !updatedMovie.liked;
    movies[index] = updatedMovie;

    this.setState({
      movies
    });

    updatedMovie.genreId = updatedMovie.genre._id;
    saveMovie(updatedMovie);
  }

  handleNewMovie = () => {
    this.props.history.push('/movies/new');
  }

  handleDelete = (movie) => {
    this.setState({
      movies: this.state.movies.filter(m => m !== movie)
    });

    deleteMovie(movie._id);
  }

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    })
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page
    });
  }

  getPagedData = () => {
    const {pageSize, currentPage, movies: allMovies, currentGenre, sortColumn} = this.state;


    const filtered = currentGenre && currentGenre._id
        ? allMovies.filter(item => item.genre._id === currentGenre._id) 
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies} ;
  }

  render() { 
    const {pageSize, currentPage, movies, genres, currentGenre, sortColumn} = this.state;

    if (movies.length === 0) {
      return (
        <p>There are no movies in the database</p>
      );
    }

    const {totalCount, data} = this.getPagedData();

    return (
      <div className="row">
        {genres.length > 1 && 
        <div className="col-lg-3">
          <ListGroup items={genres}
                     currentItem={currentGenre}
                     onItemChange={this.handleGenreChange} />
        </div>}
        
        <div className="col">
          <button onClick={this.handleNewMovie} className="btn btn-primary mb-3">New movie</button>
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable movies={data}
                       sortColumn={sortColumn}
                       onLike={this.handleLike}
                       onDelete={this.handleDelete}
                       onSort={this.handleSort} />

          <Pagination itemsCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
 
export default Movies;