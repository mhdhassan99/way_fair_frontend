import React, { Component } from 'react'
import '../styles/browseStyles.css'
import ProductCard from './productCard';

export default class Browse extends Component {

  componentDidMount() {
    this.fetchProducts()
  }

  fetchProducts = () => {
    const user_id = this.props.user;
    fetch("http://localhost:3001/getProducts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id ? user_id.id : -1
      })
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      this.props.updateProducts(data)
    });
  }

  // filterByCategory = () => {
  //   debugger
  // }

  handleRedirect = () => {
    this.props.history.push(`/login`);
  }

  handleRedirectPDP = (productId) => {
    this.props.history.push(`productDisplayPage/${productId}`);
  }

  render() {
    let products = this.props.products.map(product => (
      <ProductCard
        product={product}
        key={product.id}
        handleRedirectPDP={this.handleRedirectPDP}
        user={this.props.history.user}
        handleRedirect={this.handleRedirect}
      />
    ));
    return (
      <div className="productCards">
       {products}
      </div>
    )
  }
}
