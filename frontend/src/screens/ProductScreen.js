import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import Product from '../components/Product';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);

  const [size, setSize] = useState('small');
  const productDetails = useSelector((state) => state.productDetails);
  console.log(productDetails)
  const { loading, error, product } = productDetails;
  console.log(product)
  const [fPrice, setfPrice] = useState(350)
  // useState(product.Sprice);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
//   const [stateVal, setSizePrice] = useState({
//     fPrice:Sprice,
//     size: 'small',
//  });
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}?size=${size}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  const handleChange = (event) => {
    console.log(event)
    console.log(props)
    if(event ==='small'){
      // this.setState({ fPrice: this.state.Sprice,size:setSize(event) }  
      setSize(event)
      setfPrice(Product.Sprice)
    }else if(event ==='medium'){
      // this.setState({ fPrice: this.state.Mprice,size:setSize(event) }  
      // )      
      setSize(event)
      setfPrice(Product.Mprice)
    }
    else{
      // this.setState({ fPrice: this.state.Lprice,size:setSize(event) }  
      // )
      setSize(event)
      setfPrice(Product.Lprice)
    }
  }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                {/* <li><h4>Price :</h4> {product.price}/-</li> */}
                {/* <li><h4>FPrice :</h4> {product.Fprice}/-</li> */}
                <li><h4>Dimensions Size-L:</h4> {product.Ldimension}</li>
                <li><h4>Size-M:</h4> {product.Mdimension}</li>
                <li><h4>Size-S:</h4> {product.Sdimension}</li>
                <li><h4>Material:</h4> {product.material}</li>
                <li>
                <h4>Description:</h4>
                  <p>{product.description}</p>
                </li>
                <li>
                <h4>Instructions:</h4>
                  <p>{product.howToUse}</p>
                </li>
                <li>
                <h4>Washing Tips:</h4>
                  <p>{product.WashingTips}</p>
                </li>
                <li>
                <h4>Storage:</h4>
                  <p>{product.Storage}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Seller{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      {size ==='small' &&
                      <div className="price">{product.Sprice}/-</div>}
                      {size ==='medium' &&
                      <div className="price">{product.Mprice}/-</div>}
                      {size ==='large' &&
                      <div className="price">{product.Lprice}/-</div>}
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.LStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div>Size</div>
                          <div>
                            <select
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                                  <option  value={'small'}>
                                    Small
                                  </option>
                                  <option  value={'medium'}>
                                  Medium
                                </option>
                                  <option  value={'large'}>
                                  Large
                                </option>
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
