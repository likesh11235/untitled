import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Tilt from 'react-tilt';

export default function Product(props) {
  const { product } = props;
  const allImages = product.image;
  let path=[];
  let image = '';
  if(allImages){
    path = allImages.split('|');
  }  
  image=path[0];
  // console.log(image);

  return (
    <Tilt className="Tilt" options={{ max : 50 }} >
      <div key={product._id} className="Tilt-inner" className="card" >
        <Link to={`/product/${product._id}`}>
          <img min-height="300px" min-width="300px" className="medium" src={image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="row">
            <div id="white" className="price">{product.Sprice}/-</div>
            <div>
              {/* <Link to={`/seller/${product.seller._id}`}>
                {product.seller.seller.name}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
