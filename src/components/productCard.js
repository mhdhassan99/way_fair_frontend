import React, { Component } from 'react';
import '../styles/productCard.css';

export default class ProductCard extends Component {
  state = {
    isFavorited: this.props.product.isFavorited
  }

  componentDidMount() {
  }


  handleFavorite = (e) => {
    e.stopPropagation();

    if (!this.props.user) {
      this.props.handleRedirect();
      return false;
    }

    fetch("http://localhost:3001/toggleFavorites", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        product_id: this.props.product.id
      })
    })
    .then((response) => response.json())
    .then(data => {
        if (!data.error) {
          this.props.product.isFavorited = !this.state.isFavorited
          this.setState({
            isFavorited: !this.state.isFavorited
          })
        }
    })


  }

  render() {
    return (
      <div className="productCard" onClick={() => this.props.handleRedirectPDP(this.props.product.id)}>
        <div className="productImageContainer">
          <div className="productImage">
            <div className="imageContainer">
              <img className="image" alt="" src={this.props.product.imageTray} />
            </div>

              <div
                onClick={this.handleFavorite}
                className={this.state.isFavorited ? 'favButtonFavorited' : 'favButton'}
              >
              </div>


          </div>
        </div>
        <div className="productInfo">
          <div className="productTitleContainer">
            <span
              className="productTitle"
            >{this.props.product.title}</span>
          </div>
          <div>
            <span
              className="productPrice"
            >${this.props.product.price}</span>
          </div>
          <div className="productReviews">

              {this.props.product.reviewCount !== 1 ?
              <span>Reviewed by {this.props.product.reviewCount} people</span>
              :
              <span>Reviewed by {this.props.product.reviewCount} person</span>
              }

          </div>
        </div>
      </div>
    );
  }
}
