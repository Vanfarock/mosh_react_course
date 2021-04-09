import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import './like.scss';

function Like(props) {
  const getFilledHeartClasses = () => {
    let classes = "heart-icon";
    if (props.liked) {
      classes += " show-heart";
    } else {
      classes += " hide-heart";
    }
    return classes;
  }

  const getEmptyHeartClasses = () => {
    let classes = "heart-icon";
    if (props.liked) {
      classes += " hide-heart";
    } else {
      classes += " show-heart";
    }
    return classes;
  }

  return (
    <div className="icons" onClick={props.onClick} >
      <FontAwesomeIcon icon={faHeart} className={getFilledHeartClasses()} />
      <FontAwesomeIcon icon={emptyHeart} className={getEmptyHeartClasses()} />
    </div>
  );
}
 
export default Like;