import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './productCard';
import SplashPageCard from "./splashPageCard";


import '../styles/splashPage.css';

export default class SplashPage extends Component {
  state = {
    products: [],
    otherProducts: []
  }

  componentDidMount() {
    fetch("http://localhost:3001/trendingProducts")
    .then((response) => response.json())
    .then(data => {
      // console.log(data)
      // let sortedData = data.filter();
      this.setState({
          products: data.slice(0, 5),
          otherProducts: data.slice(4)
      });
    });
  }

  handleRedirectPDP = (productId) => {
    this.props.history.push(`productDisplayPage/${productId}`);
  }

  render() {
    let products = this.state.products.map(product => (
      <SplashPageCard product={product} key={product.id} handleRedirectPDP={this.handleRedirectPDP}/>
    ));

    let otherProducts = this.state.otherProducts.map(product => (
      <SplashPageCard product={product} key={product.id} handleRedirectPDP={this.handleRedirectPDP}/>
    ));

    return (
      <div className="pageContainer">
        <div className="carouselContainer">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 splashCarouselImage"
                src="https://i.ibb.co/B3zd9Hj/image.png"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 splashCarouselImage"
                src="https://i.ibb.co/9cVtCSN/image.png"
              />
            </Carousel.Item>
            <Carousel.Item>
              {/* https://secure.img1-fg.wfcdn.com//media/video/41/411004.mp4 */}
              <img
                className="d-block w-100 splashCarouselImage"
                src="https://i.ibb.co/7CbyGWw/image.png"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="boxContainer">
          <div className="browseProductsContainer">
            <div className="trendingItemsContainer">
              <div className="trendingItemsHeader">
                <h1>Trending Items</h1>
              </div>
            </div>

            <div>
              <div className="browseProducts">{products} </div>
            </div>
          </div>

          <div className="browseProductsContainer">
            <div className="trendingItemsContainer">
              <div className="trendingItemsHeader">
                <h1>Just For You</h1>
              </div>
            </div>

            <div>
              <div className="browseProducts">{otherProducts} </div>
            </div>
          </div>
        </div>

        <p className="hLine"></p>

        <div className="myInfoContainer">
          <div className="myInfoName">
            <h1>Muhammad Hassan</h1>
          </div>

          <div className="myInfoLinks">
            <div className="github"> My Github</div>
            <div className="linkedin"> Linkedin </div>
            <div className="myWebsite"> My Website </div>
          </div>
        </div>
      </div>
    );
  }
}
