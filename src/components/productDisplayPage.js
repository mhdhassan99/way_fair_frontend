import React, { Component } from 'react';

import Review from './review';
import '../styles/productDisplayPageStyles.css';

export default class ProductDisplayPage extends Component {

  state = {
    product: {
      title: '',
      price: 0,
      description: '',
      imageTray: [],
      reviews: []
    },
    leadImage: '',
    reviewBody: '',
  };

  componentDidMount() {
    const productId = this.props.match.params.productId;

    fetch(`http://localhost:3001/products/${productId}`)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      this.setState({
          product: data,
          leadImage: data.imageTray[0]
      });
    });
  }

  handleChangeReviewBody = (e) => {
    this.setState({reviewBody: e.target.value})
  }

  handleSubmitReview = (e) => {
    let token = localStorage.getItem('token');
    if (this.state.reviewBody !== '') {
      if (token) {
        fetch(`http://localhost:3001/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            user_id: this.props.history.user.id,
            product_id: this.state.product.id,
            body: this.state.reviewBody
          })
        })
        .then((response) => response.json())
        .then(data => {
          console.log(data)
          this.setState({
              product: {
                ...this.state.product,
                reviews: [...this.state.product.reviews, data]
              }
          });
        });
      } else {
        this.props.history.push('/login');
      }
    }
  }

  handleDeleteComment = (reviewId) => {
    if (!this.props.history.user) {
      this.props.history.push('/login')
      return false;
    }
    fetch(`http://localhost:3001/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: this.props.history.user.id
      })
    })
    .then((response) => response.json())
    .then(data => {
      console.log('comment delete data', data)
      if (data.status === 'success') {
        this.setState({
            product: {
              ...this.state.product,
              reviews: this.state.product.reviews.filter(review => review.id !== reviewId)
            }
        });
      }
    });
  }

  handleChangeLeadImage = (e) => {
    const selectedImage = e.target.src;
    this.setState({leadImage: selectedImage})
  }

  handleAddToCart = () => {
    if (!this.props.history.user) {
      this.props.history.push('/login')
      return false;
    }
    fetch(`http://localhost:3001/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        product_id: this.state.product.id,
        user_id: this.props.history.user?.id
      })
    })
    .then((response) => response.json())
    .then(data => {
      console.log('add to cart data', data)

    });

  }

  // product category + number of reviews
  render() {
    return (
      <div className="productDisplayPageContainer">
        <div className="pdpProductImageContainer">

          <div className="pdpLeadImageContainer">
            <img className="pdpLeadImage" src={this.state.leadImage} />
          </div>
          <div className="pdpImageTrayContainer">
            {this.state.product.imageTray.map(img =>
              <div
                className="thumbnailImageContainer"
                key={img}
              >
                <img
                onClick={this.handleChangeLeadImage}
                className="thumbnailImage"
                id={img === this.state.leadImage ? "selectedImage" : ""}
                src={img} key={img}/>
              </div>
            )}
          </div>

        </div>

        {/* product title */}
        <div className="pdpProductInfoContainer">
          <div className="pdpProductTitle">
            <h3>{this.state.product.title}</h3>
          </div>

          {/* product price */}
          <div className="pdpProductPrice">
            <h3
              className="pdpProductPriceH3"
            >${this.state.product.price}</h3>
          </div>

          {/* add to cart button */}
          <div className="productAddToCart">
            <button
              onClick={this.handleAddToCart}
              className="pdpAddToCartBtn"
            >
              Add to Cart</button>
          </div>

          {/* product description */}
          <div className="productDescription">
            <h3 className="pdpDescription">Description</h3>
            <span>
              {this.state.product.description}
            </span>
          </div>

          {/* add comment area */}
          <div className="pdpCreateCommentContainer">
            <div className="pdpCreateComment">
              <textarea
                cols="70" rows="5"
                className="pdpReviewTextArea"
                value={this.state.reviewBody}
                onChange={this.handleChangeReviewBody}
              ></textarea>
              <span className="placeholder">Tell us what you think!</span>
            </div>
            <div className="pdpSubmitCommentContainer">
              <button
                className="pdpSubmitCommentBtn"
                onClick={this.handleSubmitReview}
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* user reviews area */}
          <div className="pdpProductReviews">
            <h3 className="pdpReviewHeader">Reviews</h3>
            {this.state.product.reviews.map(review => {
              return <Review review={review} key={review.id} handleDeleteComment={this.handleDeleteComment}/>
            })}
          </div>
        </div>
      </div>
    )
  }
}
