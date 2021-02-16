import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  let qStr= props.location.search?props.location.search.split('=')[1]:1
  let qty = qStr
  if (qStr!==1){
    qty = qStr.split('?')[0] ?qStr.split('?')[0]:1
  }
  const PsizeArr = props.location.search
    ? props.location.search.split('=')[2]
    : 'small';
  
  const Psize = PsizeArr.split('?')[0];

  const Pprice = props.location.search.split('=')[3];
  const [size, setSize] = useState(Psize);
  const [price, setPrice] = useState(Pprice);
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty,size));
    }
  }, [dispatch, productId, qty,size]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30" >
                    <Link to={`/product/${item.product}`}><span id="black">{item.name}</span></Link>
                  </div>
                  <div>
                            <select
                              value={item.size}
                              onChange={(e) => {
                                let p = price;
                                if(e.target.value ==='small'){
                                  p=item.Sprice;
                                }else if(e.target.value ==='medium'){
                                  p=item.Mprice;
                                }
                                else{
                                  p=item.Lprice;
                                }
                                dispatch(
                                addToCart(item.product, item.qty, e.target.value,p))
                              }}
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
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value), item.size)
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                  {item.size ==='small' &&
                      <div className="price">{item.Sprice * item.qty}/-</div>}
                      {item.size ==='medium' &&
                      <div className="price">{item.Mprice * item.qty}/-</div>}
                      {item.size ==='large' &&
                      <div className="price">{item.Lprice * item.qty}/-</div>}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                <span id="white">
                Subtotal ({cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items) : 
                {cartItems.reduce((a, c) => a + (c.size==='small'?c.Sprice * c.qty:c.size==='medium'?c.Mprice * c.qty:c.Lprice * c.qty), 0)}/-
                </span>
               
                
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

