import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      {/* <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )} */}
      <marquee align="middle" width="60%" direction="right">For <strong>Bulk Orders</strong> you can contact us!</marquee>
      <h2 className="category_title" id="Products">Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}  
           <section className="section-features js--section-features" id="features">
            <div className="row">
                <h2>Health is Wealth &mdash;Let us earn you that</h2>
                
                <p className="long-copy">
                    Hello, we're Untitled Arts, a premium earthenware delivery service. We know you're always busy. No time for looking what's good for health. So let us take care of that, we're really good at it, we promise!
                </p>
            </div>
            
            <div className="row js--wp-1">
                <div className="col span-1-of-4 box">
                    <img className="icons" src="/images/kitchen.jpg" alt="use"></img>
                    <h3>Kitchenware</h3>
                    <p>
                        Never get unhealthy again! We really mean that. Our Kitchenware is made by traditional folks who have been doing this from centuries with great expertise and precision. You can also choose to order more flexibly if that's your style.
                    </p>
                </div>
                <div className="col span-1-of-4 box">
                    <img className="icons" src="/images/decorative.jpg" alt="use"></img>
                    <h3>Other decoratory items</h3>
                    <p>
                        Look at our catalogue to experience the wide range of our products.We work with the best artisans to ensure that you're 100% satisfied with product.
                    </p>
                </div>
                <div className="col span-1-of-4 box">      
                    <img className="icons" src="/images/organic.jpg" alt="use"></img>
                    <h3>100% organic and safe</h3>
                    <p>
                        All our products are local, not glazed and made from pure clay. colours are added with natural dyes. Good for your health and the environment!
                    </p>
                </div>
                <div className="col span-1-of-4 box">
                    <img className="icons" src="/images/order.jpg" alt="use"></img>
                    <h3>Order anything</h3>
                    <p>
                        We don't limit your creativity, which means you can order whatever you feel like. You can also choose from our catalogue containing wide range of varieties. It's up to you!
                    </p>
                </div>
            </div>   
        </section>
        <section className="section-features js--section-features" id="instructions">
            <div className="row">
                <h2>Instructions</h2>
            </div>
            
            <div className="row js--wp-1">
                <div className="col span-1-of-3 box">
                    <img className="icons" src="/images/use.jpg" alt="use"></img>
                    <h3>How to use</h3>
                    <p>
                    Dip the utensil completely in water for a day and then fill the vessel with rice starch for few hours.When the vessel is hot do not pour cold water, let the vessel temperature come to normal then wash.
                    </p>
                </div>
                <div className="col span-1-of-3 box">
                    <img className="icons" src="/images/wash.jpg" alt="use"></img>
                    <h3>How to wash</h3>
                    <p>
                    Always avoid Metallic scrubber rather use Soft sponge. Simply use hot water with lime. Avoid cleaning earthenware with a soap or detergent or in a dish washer.
                    </p>
                </div>
                <div className="col span-1-of-3 box">
                    <img className="icons" src="/images/store.jpg" alt="use"></img>
                    <h3>Storage</h3>
                    <p>
                    Allow the vessel to dry completely before storage. Once in a week Fill half the vessel with water, boil for 3 min ,then dispose the water to remove oil and stains, this will also strengthen and hygiene the utensil.
                    </p>
                </div>
            </div>   
        </section>
        <section className="section-features js--section-features" id="instructions">
            <div className="col">
                <img className="logo" src="/images/logo.png" alt="logo"></img>
                <p className="tag">We care your trust!</p>
            </div>  
        </section>
    </div>
  );
}
