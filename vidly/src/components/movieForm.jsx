import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      numberInStock: '',
      dailyRentalRate: '',
      genreId: '',
    },
    errors: { },
    genres: []
  };

  schema = {
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

  componentDidMount() {
    const emptyGenre = { _id: '', name: '' };
    const genres = [ emptyGenre, ...getGenres()];
    this.setState({ genres });
    
    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.initializeData(movie) })
  }

  initializeData(movie) {
    const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
    
    return {
      _id,
      title,
      genreId: genre._id,
      numberInStock,
      dailyRentalRate
    }
  }

  formatGenres() {
    const { genres } = this.state;

    return genres.map(g => ({ value: g._id, name: g.name }));
  }

  doSubmit() {
    saveMovie(this.state.data);

    this.props.history.push('/movies');
  }

  render() { 
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderCombobox('genreId', 'Genre', this.formatGenres())}
          {this.renderInput('numberInStock', 'Number in stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
 
export default MovieForm;
