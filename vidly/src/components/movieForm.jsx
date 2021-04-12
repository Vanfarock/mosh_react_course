import React from 'react';
import { PropTypes } from 'prop-types';

const MovieForm = ({ match }) => {
  return (
    <h1>Movie Form {match.params.id}</h1>
  );
}

MovieForm.propTypes = {
  movieId: PropTypes.string
}
 
export default MovieForm;