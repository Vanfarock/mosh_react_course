import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import './like.scss';

function Like({liked, onClick}) {
  const getFilledHeartClasses = () => {
    let classes = "heart-icon";
    if (liked) {
      classes += " show-heart";
    } else {
      classes += " hide-heart";
    }
    return classes;
  }

  const getEmptyHeartClasses = () => {
    let classes = "heart-icon";
    if (liked) {
      classes += " hide-heart";
    } else {
      classes += " show-heart";
    }
    return classes;
  }

  return (
    <div className="icons" onClick={onClick} >
      <FontAwesomeIcon icon={faHeart} className={getFilledHeartClasses()} />
      <FontAwesomeIcon icon={emptyHeart} className={getEmptyHeartClasses()} />
    </div>
  );
}

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}
 
export default Like;