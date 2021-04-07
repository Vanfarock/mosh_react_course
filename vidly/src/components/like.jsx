import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import './like.scss';

class Like extends Component {
  state = {
    isHovering: false,
    liked: false
  };

  handleClick = () => {
    this.setState({
      isHovering: this.state.isHovering,
      liked: !this.state.liked
    });
  }

  handleMouseHover = () => {
    this.setState({
      isHovering: true,
      liked: this.state.liked
    });
  }

  handeMouseLeave = () => {
    this.setState({
      isHovering: false,
      liked: this.state.liked
    });
  }

  render() { 
    return (
      <div className="icons" onClick={this.handleClick} 
                             onMouseOver={this.handleMouseHover} 
                             onMouseLeave={this.handeMouseLeave}>
        <FontAwesomeIcon icon={faHeart} className={this.getFilledHeartClasses()} />
        <FontAwesomeIcon icon={emptyHeart} className={this.getEmptyHeartClasses()} />
      </div>
    );
  }

  getFilledHeartClasses() {
    let classes = "heart-icon";
    if (this.state.liked) {
      classes += " show-heart";
    } else if (this.state.isHovering) {
      classes += " partial-heart";
    } else {
      classes += " hide-heart";
    }
    return classes;
  }

  getEmptyHeartClasses() {
    let classes = "heart-icon";
    if (this.state.liked) {
      classes += " hide-heart";
    } else {
      classes += " show-heart";
    }
    return classes;
  }
}
 
export default Like;