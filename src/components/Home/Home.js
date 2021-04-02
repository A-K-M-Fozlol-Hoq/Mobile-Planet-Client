import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState }  from 'react';
import Header from '../Header/Header';
import Product from '../Product/Product';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5055/phones')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])
    return (
        <div>
            <Header></Header>
            <div className="books-card">
                {
                    products.length ===0 &&
                    <CircularProgress />
                }
            {
                products.map(pd =>
                    <Product
                        key={pd._id}
                        product={pd}>
                    </Product>)
            }
            </div>
        </div>
    );
};

export default Home;