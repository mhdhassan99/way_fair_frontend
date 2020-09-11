import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

import '../styles/cartPageStyles.css';

export default class CartProductCart extends Component {
  state = {
    quantity: this.props.product.quantity,
    isAlertOn: false,
    alertMessage: "Please input a valid number"
  }

  onChangeQuantity = (e) => {
    let val = e.target.value;
    // debugger
    this.setState({
      quantity: val
    })
  }

  handleSubmitQuantity = (e) => {
    e.preventDefault();
    let val = this.state.quantity;
    let parsedValue = parseInt(val);
    if (val === "") {
      this.setState({isAlertOn: true})
    } else if (!(parsedValue > 0 && parsedValue < 99)) {
      this.setState({isAlertOn: true})
    } else {
      this.setState({isAlertOn: false})
      fetch(`http://localhost:3001/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          product_id: this.props.product.id,
          user_id: this.props.user.id,
          quantity: parsedValue
        })
      })
      .then((response) => response.json())
      .then(data => {
        console.log('update cart quantity', data)
        this.props.calculateAmount({id: this.props.product.id, quantity: data.quantity})
      });
    }

  }

  render() {
    return (
      <div className="cartProductCard">
        <div className="cartImageContainer">
          <img
            className="cartImage"
            src={this.props.product.leadImage}
          />
        </div>
        <div className="cartProductInfoContainer">
          <div className="productTitlePriceContainer">
            <span className="productTitle">
              {this.props.product.title}
            </span>
            <span className="productPrice">
              ${this.props.product.price}
            </span>
          </div>
          <div className="cartCheckoutInfoQuantityContainer">
            <span className="cartCheckoutInfo">
            Get it in 8-10 weeks
            FREE Outdoor Drop-Off (No Contact)
            We'll reach out to schedule the delivery after your item ships
            </span>
            <div className="quantityRemoveItemContainer">
              <label>Quantity:</label>
              <form onSubmit={this.handleSubmitQuantity}>
                <input
                  type="text"
                  onChange={this.onChangeQuantity}
                  value={this.state.quantity}
                  className="quantity"
                  placeholder="Quantity"
                />
              </form>
              {this.state.isAlertOn &&
                <Alert variant="danger">
                  {this.state.alertMessage}
                </Alert>
             }


              <button
                className="cartRemoveItemButton"
                onClick={() => this.props.removeItem(this.props.product.id)}
              >
              <img
                style={{width: '30px'}}
              src="https://img.icons8.com/carbon-copy/100/000000/delete-forever--v1.png"/>Remove</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

{/* <form onSubmit={this.handleSubmit}>
  <input
    placeholder="username"
    type="text"
    name="username"
    value={this.state.username}
    onChange={this.handleChange}
  />
  <input
    placeholder="password"
    type="password"
    name="password"
    value={this.state.password}
    onChange={this.handleChange}
  />
  <button placeholder="submit" type="submit">
    Log In
  </button>
  <div>
    or <Link to="/signup">sign up</Link>
  </div>
</form>  */}
