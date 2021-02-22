import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
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
  const { loading, error, product } = productDetails;
  
  let imagePath = [];
  if(product){
    imagePath = product.image.split('|');    
  }
  // to remove extra '|'
  if(imagePath.length>1){
    imagePath.pop();
  }
  
  // imagePath = product.image || '';
  const [price, setPrice] = useState(250);
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
    let p = price;
    if(size ==='small'){
      p=product.Sprice;
    }else if(size ==='medium'){
      p=product.Mprice;
    }
    else{
      p=product.Lprice;
    }
    props.history.push(`/cart/${productId}?qty=${qty}?size=${size}?price=${p}`);
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
  // const handleChange = () => {
    
  //   console.log("allo");
  //   if(size ==='small'){
  //     // this.setState({ fPrice: this.state.Sprice,size:setSize(event) }  
  //     // setSize(event)
  //     console.log("allo");
  //     setPrice(Product.Sprice)
  //   }else if(size ==='medium'){
  //     // this.setState({ fPrice: this.state.Mprice,size:setSize(event) }  
  //     // )      
  //     // setSize(event)
  //     setPrice(Product.Mprice)
  //   }
  //   else{
  //     // this.setState({ fPrice: this.state.Lprice,size:setSize(event) }  
  //     // )
  //     // setSize(event)
  //     setPrice(Product.Lprice)
  //   }
  // }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/"><div id="back-to-result">Back to result</div></Link>
          <div className="row top">
            <div className="col-2">
              
            {/* <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img> */}
              <Carousel centerSlidePercentage="100" emulateTouch useKeyboardArrows stopOnHover swipeable dynamicHeight showArrows autoPlay infiniteLoop showThumbs>
                {imagePath.map((path) => (
                  <div className="carousel-inner"  key={product.id}>
                      <img  className="carousel-img" width="100%" src={path} alt={product.name} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    id="black"
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                {/* <li><h4>Price :</h4> {product.price}/-</li> */}
                {/* <li><h4>FPrice :</h4> {product.Fprice}/-</li> */}
                <h2>Dimensions</h2>
                {product.Lprice>0 && (
                  <>
                    <li className="pDetails"><h2>Size-L:</h2> {product.Ldimension}</li>
                  </>
                )}
                {product.Mprice>0 && (
                  <>
                    <li className="pDetails"><h2>Size-M:</h2> {product.Mdimension}</li>
                  </>
                )}
                {product.Sprice>0 && (
                  <>
                    <li className="pDetails"><h2>Size-S:</h2> {product.Sdimension}</li>
                  </>
                )}
                <li className="pDetails"><h2>Material:</h2> {product.material}</li>
                <li>
                <h2>Description:</h2>
                  <p className="pDetails">{product.description}</p>
                </li>
                {/* <li>
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
                </li> */}
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    {/* <span id="seller">Seller{' '}</span> */}
                    {/* <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2> */}
                    {/* <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating> */}
                  </li>
                  <li className="pDetails">
                    <div className="row" id="white">
                      <div>Price</div>
                      {size ==='small' &&
                      <div className="price">{product.Sprice}/-</div>}
                      {size ==='medium' &&
                      <div className="price">{product.Mprice}/-</div>}
                      {size ==='large' &&
                      <div className="price">{product.Lprice}/-</div>}
                    </div>
                  </li>
                  <li className="pDetails">
                    <div className="row" id="white">
                      <div>Status</div>
                      <div id="white">
                        
                        {(product.Sstock > 0 || product.Mstock > 0 || product.Lstock > 0) ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {(product.Sstock > 0 || product.Mstock > 0 || product.Lstock > 0) && (
                    <>
                      <li className="pDetails">
                        <div className="row" id="white">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              
                              {[...Array(size == "small" 
                              ? product.Sstock : size == "medium" 
                              ? product.Mstock : product.Lstock)
                              .keys()].map(
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
                      <li className="pDetails">
                        <div className="row" id="white">
                          <div>Size</div>
                          <div>
                            <select
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                              {product.Sstock>0 && (
                                <>
                                  <option  value={'small'}>
                                    Small
                                  </option>
                                </>
                              )}
                              {product.Mstock>0 && (
                                <>
                                  <option  value={'medium'}>
                                    Medium
                                  </option>
                                </>
                              )}
                              {product.Lstock>0 && (
                                <>
                                  <option  value={'large'}>
                                    Large
                                  </option>
                                </>
                              )}
                                  {/* <option  value={'small'}>
                                    Small
                                  </option>
                                  <option  value={'medium'}>
                                  Medium
                                </option>
                                  <option  value={'large'}>
                                  Large
                                </option> */}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler }
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
