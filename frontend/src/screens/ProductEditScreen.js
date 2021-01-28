import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [Sprice, setSprice] = useState('');
  const [Lprice, setLprice] = useState('');
  const [Mprice, setMprice] = useState('');
  const [seller, setSeller] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [Ldimension, setLdimension] = useState('');
  const [Mdimension, setMdimension] = useState('');
  const [Sdimension, setSdimension] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [WashingTips, setWashingTips] = useState('');
  const [Storage, setStorage] = useState('');
  const [Lstock, setLstock] = useState('');
  const [Mstock, setMstock] = useState('');
  const [Sstock, setSstock] = useState('');
  const [lid, setLid] = useState('');
  const [painted, setPainted] = useState('');
  // const [Sstock, setSstock] = useState('');
  // const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setSprice(product.Sprice);
      setMprice(product.Mprice);
      setLprice(product.Lprice);
      setSeller(product.seller);
      setColor(product.color);
      setMaterial(product.material);
      setLdimension(product.Ldimension);
      setMdimension(product.Mdimension);
      setSdimension(product.Sdimension);
      setHowToUse(product.howToUse);
      setWashingTips(product.WashingTips);
      setStorage(product.Storage);
      setLstock(product.Lstock);
      setMstock(product.Mstock);
      setSstock(product.Sstock);
      setLid(product.lid);
      setPainted(product.painted);
      // setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        category,
        brand,
        countInStock,
        description,
        seller,
    color,
    material,
    Ldimension,
    Mdimension,
    Sdimension,
    howToUse,
    WashingTips,
    Storage,
    Lprice,
    Mprice,
    Sprice,
    Lstock,
    Mstock,
    Sstock,
    lid,
    painted
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Lprice">LPrice</label>
              <input
                id="LPrice"
                type="text"
                placeholder="Enter Lprice"
                value={Lprice}
                onChange={(e) => setLprice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">MPrice</label>
              <input
                id="price"
                type="text"
                placeholder="Enter Mprice"
                value={Mprice}
                onChange={(e) => setMprice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">SPrice</label>
              <input
                id="price"
                type="text"
                placeholder="Enter Sprice"
                value={Sprice}
                onChange={(e) => setSprice(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="LStock">LStock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter Lstock"
                value={Lstock}
                onChange={(e) => setLstock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="MStock">MStock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter Mstock"
                value={Mstock}
                onChange={(e) => setMstock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Sstock">SStock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter Sstock"
                value={Sstock}
                onChange={(e) => setSstock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Painted">Painted</label>
              <input
                id="Painted"
                type="text"
                placeholder="Enter Painted status"
                value={painted}
                onChange={(e) => setPainted(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Lid">Lid</label>
              <input
                id="Lid"
                type="text"
                placeholder="Enter Lid status"
                value={lid}
                onChange={(e) => setLid(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="color">color</label>
              <input
                id="color"
                type="text"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="material">material</label>
              <input
                id="material"
                type="text"
                placeholder="Enter Material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Ldimension">Ldimension</label>
              <input
                id="Lid"
                type="text"
                placeholder="Enter L Dimension"
                value={Ldimension}
                onChange={(e) => setLdimension(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Mdimension">Mdimension</label>
              <input
                id="Mdimension"
                type="text"
                placeholder="Enter M Dimension"
                value={Mdimension}
                onChange={(e) => setMdimension(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Sdimension">Sdimension</label>
              <input
                id="Sdimension"
                type="text"
                placeholder="Enter S Dimension"
                value={Sdimension}
                onChange={(e) => setSdimension(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">How to use</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter How to use"
                value={howToUse}
                onChange={(e) => setHowToUse(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="description">WashingTips</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter How to Wash"
                value={WashingTips}
                onChange={(e) => setWashingTips(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="description">Storage</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter Storage"
                value={Storage}
                onChange={(e) => setStorage(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
