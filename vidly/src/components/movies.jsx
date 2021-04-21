import React, { Component } from 'react';
import { getMovies, saveMovie, deleteMovie } from '../services/movieService';
import { getGenres } from './../services/genreService';
import MoviesTable from './moviesTable';
import Searchbox from './common/searchbox';
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
    searchQuery: '',
    currentGenre: null,
    sortColumn: {
      path: 'title',
      order: 'asc'
    }
  };

  async componentDidMount() {
    try {
      const currentGenre ={_id: '', name: 'All Genres'};
      const genres = [currentGenre, ...await getGenres()];
  
      this.setState({
        movies: await getMovies(),
        currentGenre,
        genres
      });
    }
    catch (ex) {
      console.log(ex);
    }
  }

  handleGenreChange = genre => {
    this.setState({
      currentGenre: genre,
      currentPage: 1,
      searchQuery: ''
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

  handleSearch = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      currentGenre: null,
      currentPage: 1
    });
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
    const { pageSize, currentPage, sortColumn } = this.state;

    const filtered = this.filterMovie();
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length || 0, data: movies} ;
  }

  filterMovie() {
    const { movies, currentGenre, searchQuery } = this.state;

    if (searchQuery) return movies.filter(item => item.title.toLowerCase().startsWith(searchQuery));
    
    return currentGenre && currentGenre._id
              ? movies.filter(item => item.genre._id === currentGenre._id) 
              : movies;
  }

  render() { 
    const {pageSize, currentPage, movies, genres, currentGenre, searchQuery, sortColumn} = this.state;

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
          <Searchbox value={searchQuery}
                     onChange={this.handleSearch} />
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