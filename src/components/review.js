import React, { Component } from 'react';
import '../styles/reviewStyles.css';

export default class Review extends Component {
  state = {
    userImage: 'https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg'
  }

  componentDidMount() {
    if (this.props.review.userPicture !== "") {
      this.setState({
        userImage: this.props.review.userPicture
      })
    }
  }

  render() {
    return (
      <div className="pdpReviewContainer">
        <div className="userProfile">
          <span
            className="pdpReviewUsername"
          >{this.props.review.userName}</span>
          <img
          className="pdpReviewPfp"
          src={this.state.userImage} alt=""/>
        </div>
        <div className="pdpReviewBodyContainer">
          <span
            className="pdpReviewBody"
          >{this.props.review.body}</span>
          <span className="pdpTimeStamp">{this.props.review.createdAt}</span>
        </div>
        <div className="pdpReviewCommentDeleteContainer">
          <button
            className="pdpReviewCommentDeleteButton"
            onClick={() => this.props.handleDeleteComment(this.props.review.id)}
          >
            Delete Comment
          </button>
        </div>
      </div>
    )
  }
}
