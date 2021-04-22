import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
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
    const currentGenre ={_id: '', name: 'All Genres'};
    const { data } = await getGenres();
    const genres = [currentGenre, ...data];
    
    const { data: movies } = await getMovies();

    this.setState({
      movies,
      currentGenre,
      genres
    });
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

  handleSearch = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      currentGenre: null,
      currentPage: 1
    });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: originalMovies.filter(m => m !== movie)
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      this.setState({
        movies: originalMovies
      })
      console.log(ex.response);
      if (ex.response && ex.response.status === 404) {
        toast.error('This movie has already been deleted.');
      }
    }
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
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return movies.filter(item => item.title.toLowerCase().startsWith(query));
    }

    return currentGenre && currentGenre._id
              ? movies.filter(item => item.genre._id === currentGenre._id) 
              : movies;
  }

  render() { 
    const {pageSize, currentPage, movies, genres, currentGenre, searchQuery, sortColumn} = this.state;
    const { user } = this.props;

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
          { user && <Link to="/movies/new" className="btn btn-primary mb-3">New movie</Link>}
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