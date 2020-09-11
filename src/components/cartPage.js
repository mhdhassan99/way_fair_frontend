import React, { Component } from 'react';
import CartProductCart from './cartProductCard';
import {Button, Modal} from 'react-bootstrap';

import '../styles/cartPageStyles.css';

export default class CartPage extends Component {

  state = {
    cartProducts: [],
    cartId: null,
    subTotal: 351,
    shippingPrice: 0,
    shippingAmt: 0.1,
    total: 371,
    tax: 0.08875,
    taxAmt: 0,
    shouldShowBoughtModal: false
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.getCartProducts();
    } else {
      this.props.history.push('/browse')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      if (!this.props.isLoggedIn) {
        this.props.history.push('/browse')
      }
    }
  }
  calculateAmount = (updateItem = {}) => {
    // debugger
    if (Object.keys(updateItem).length !== 0) {
      this.setState({
        cartProducts: this.state.cartProducts.map(product => {
          if (product.id === updateItem.id) {
            product.quantity = updateItem.quantity
          }
          return product;
        })
      })
    }
    let quantities = this.state.cartProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0)
    console.log(quantities)
    let shippingPrice = (this.state.shippingAmt * quantities).toFixed(2);
    let taxAmt = (quantities * this.state.tax).toFixed(2);
    // let quantities = this.state.cartProducts.map(product => product.quantity)
    this.setState({
      subTotal: quantities,
      shippingPrice,
      total: (quantities + parseFloat(shippingPrice) + parseFloat(taxAmt)).toFixed(2),
      taxAmt
    })
  }


  getCartProducts = () => {
    console.log(this.props)
    fetch(`http://localhost:3001/carts/${this.props.user.id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then(data => {
      console.log('cart data', data)
      this.setState({
        cartProducts: data.products,
        cartId: data.cartId
      }, () => this.calculateAmount());
    });
  }

  handleRemoveItem = (productId) => {
    fetch(`http://localhost:3001/deleteCartItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        cart_id: this.state.cartId,
        product_id: productId
      })
    })
    .then((response) => response.json())
    .then(data => {
      if (data.message) {
        this.setState({
          cartProducts: this.state.cartProducts.filter(product => product.id !== productId)
        }, () => this.calculateAmount())
      }
      // this.setState({
      //   cartProducts: data
      // }, () => this.calculateAmount());
    });

  }

  handleBuy = () => {
    fetch(`http://localhost:3001/deleteAllCartItems`, {
      method: 'DELETE'
    })
    this.setState({
      shouldShowBoughtModal: true,
      cartProducts: []
    })
  }

  handleCloseModal = () => {
    this.setState({
      shouldShowBoughtModal: false
    })
  }

  handleRedirectBrowse = () => {
    this.setState({
      shouldShowBoughtModal: false
    })
    this.props.history.push('/browse')
  }

  render() {
    return (
      <div>
        <div className="cartPageContainer">

          <div className="productsContainer">
            {this.state.cartProducts.map(product => <CartProductCart
              product={product}
              key={product.id}
              user={this.props.history?.user}
              calculateAmount={this.calculateAmount}
              removeItem={this.handleRemoveItem}
            />)}
          </div>

          {this.state.cartProducts.length !== 0 ?
          <div className="checkoutContainer">
            <div className="checkoutInfoSpanContainer">
              <span className="checkoutInfoSpan">
                Item Subtotal:
              </span>
              <span className="checkoutInfoSpan">
                ${this.state.subTotal}
              </span>
            </div>

            <div className="checkoutInfoSpanContainer">
              <span className="checkoutInfoSpan">
                Shipping Price:
              </span>
              <span className="checkoutInfoSpan">
                ${this.state.shippingPrice}
              </span>
            </div>

            <div className="checkoutInfoSpanContainer">
              <span className="checkoutInfoSpan">
                Estimated Tax:
              </span>
              <span className="checkoutInfoSpan">
                ${this.state.taxAmt}
              </span>
            </div>

            <hr/>
            <div className="totalSpanContainer">
              <span className="checkoutTotal">
                Total:
              </span>
              <span className="checkoutTotal">
                ${this.state.total}
              </span>
            </div>
            <div className="cartBuyProductButtonContainer">
              <button
                onClick={this.handleBuy}
                className="CartBuyProduct"
              >
                Buy Now
              </button>
            </div>
          </div>
          :
          <div
            className="emptyCartPageTextContainer"
          >
            <h1>Add Products to Cart to See Products</h1>
          </div>
          }
          <Modal show={this.state.shouldShowBoughtModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Your items have been shipped!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Thank you for your business</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleRedirectBrowse}>
                Continue Shopping
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    )
  }
}
