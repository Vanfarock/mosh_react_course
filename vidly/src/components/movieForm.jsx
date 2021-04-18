import React from 'react';
// import { PropTypes } from 'prop-types';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
// import { Redirect } from 'react-router-dom';

class MovieForm extends Form {
  constructor(props) {
    super();

    let movieId = this.getMovieId(props);
    const movie = getMovie(movieId);
    const emptyGenre = { _id: '', name: '' };
    const genres = [emptyGenre, ...getGenres()];

    if (movieId && !movie) {
      this.redirectToNotFound(props);
    }

    this.state = {
      data: this.initializeData(movie),
      errors: { },
      movie,
      genres
    };

    this.schema = {
      _id: Joi.string(),
      title: Joi.string()
                .required()
                .label('Title'),
      numberInStock: Joi.number()
                        .positive()
                        .integer()
                        .max(100)
                        .required()
                        .label('Number in Stock'),
      dailyRentalRate: Joi.number()
                          .required()
                          .positive()
                          .max(10)
                          .label('Rate'),
      genreId: Joi.string()
                .required()
                .label('Genre'),
    }
  }

  getMovieId(props) {
    if (props && props.match) {
      return props.match.params.id;
    }
    return;
  }

  redirectToNotFound(props) {
    const { history } = props;

    history.replace('/not-found')
  }

  initializeData(movie) {
    if (movie) {
      const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
      
      return {
        _id,
        title,
        genreId: genre._id,
        numberInStock,
        dailyRentalRate
      }
    }
    return {
      title: '',
      numberInStock: '',
      dailyRentalRate: '',
      genreId: '',
    }
  }

  formatGenres() {
    const { genres } = this.state;

    return genres.map(g => ({ value: g._id, name: g.name }));
  }

  doSubmit() {
    const { data } = this.state;
    const newMovie = { 
      _id: data._id,
      title: data.title,
      genreId: data.genreId,
      numberInStock: data.numberInStock,
      dailyRentalRate: data.dailyRentalRate,
    }
    saveMovie(newMovie);

    this.props.history.push('/movies');
  }

  render() { 
    // const { data, genres } = this.state;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderCheckBox('genreId', 'Genre', this.formatGenres())}
          {/* <div className="form-group">
            <label htmlFor="genreId" className="control-label">Genre</label>
            <div>
              <select className="form-control" id="genreId" name="genreId" value={data.genreId} onChange={e => this.handleChange(e)}>
                {genres && genres.map(genre => (
                  <option key={genre._id} value={genre._id}>{genre.name}</option>  
                ))}
              </select>
            </div>
            {this.state.errors['genreId'] && <div className="alert alert-danger">{this.state.errors['genreId']}</div>}
          </div> */}
          {this.renderInput('numberInStock', 'Number in stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
 
export default MovieForm;
