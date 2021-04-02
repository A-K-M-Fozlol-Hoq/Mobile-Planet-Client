import React from 'react';
import { useHistory } from 'react-router';
import './Product.css'
const Product = (props) => {
    const { imageURL, name, price, _id } = props.product;

    const history = useHistory(); 
    const handleClick = (carId) => {
        history.push(`/checkout/${_id}`)
    }
    return (
            <div className="card">
                <img src={imageURL}/>
                <div className="card-footer">
                    <h4 className='ml-10'><b>{name}</b></h4>
                    <p className='ml-10'>{price}</p>
                    <button className='text-center' onClick={handleClick}>Buy Now</button>
                </div>
            </div>
    );
};

export default Product;