import React, { Component } from 'react';
import "../styles/splashPageCard.css";

class SplashPageCard extends Component {

    render() {
        console.log("splash Page Card", this.props.product);
        return (
            <div className="trendingItemContainer">

                <div className="trendingItemsImage" onClick={() => this.props.handleRedirectPDP(this.props.product.id)}>
                    <img className="trendingImage" alt="" src={this.props.product.imageTray} />
                </div>
                {/* <div className="reviewContainer">
                    {this.props.product.reviewCount !== 1 ?
                        <span>Reviewed by {this.props.product.reviewCount} people</span>
                        :
                        <span>Reviewed by {this.props.product.reviewCount} person</span>
                    }
                </div> */}

            </div>
        );
    }
}

export default SplashPageCard;
