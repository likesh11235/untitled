import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link, useParams } from 'react-router-dom';

export default function AllProductsScreen() {
    const { pageNumber = 1 } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;
    useEffect(() => {
        dispatch(listProducts({ pageSize: 8, pageNumber:pageNumber }));
      }, [dispatch, pageNumber]);
    return(
        <div>
            <h2 className="category_title" id="Products">All Products</h2>
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
                <div className="row center pagination">
                    {[...Array(pages).keys()].map((x) => (
                    <Link
                        className={x + 1 === page ? 'active' : ''}
                        key={x + 1}
                        to={`/allProducts/pageNumber/${x + 1}`}
                    >
                        {x + 1}
                    </Link>
                    ))}
                </div>
                </>
            )}      
        </div>
    );
}