import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import TableView from '../TableView/TableView';
import './Admin.css'

const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setIMageURL] = useState(null);
    const [showManagePhone, setShowManagePhone] = useState(false)
    const [showAddPhone, setShowAddPhone] = useState(true)

    const onSubmit = data => {
        console.log(data)
        console.log(data.name)
        console.log(data.price)
        const phoneData = {
            name: data.name,
            price: data.price,
            imageURL: imageURL
        };
        console.log(phoneData)
        const url = `http://localhost:5055/addPhone`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(phoneData)
        })
            .then(res => {
                alert('product added! Thank You')
                console.log('server side response', res)
            })
    };

    const handleImageUpload = event => {
        // console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'e529ec75a69c3bacefe0e39d6395edaf');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setIMageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const handleClick = (showManagePhone) => {
        if (showManagePhone) {
            setShowAddPhone(false);
            setShowManagePhone(true);
        }
        else {
            setShowManagePhone(false);
            setShowAddPhone(true);
        }
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5055/phones')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    return (
        <div className='admin'>
            <div className="admin-menu">
                <h1 className='text-center'>Admin panel</h1>
                <br />
                <p className='ml-10' href="#" onClick={() => handleClick(true)}>Manage Product</p>
                <p className='ml-10' href="#" onClick={() => handleClick(false)}>Add Phone</p>
            </div>
            
            <div className='admin-function text-center'>
            {   showManagePhone &&
                <div className="manage-phone" id='manage-phone'>
                    {
                        products.length >0 && 
                        <TableView products={products}></TableView>
                    }
                </div>
            }
            {   showAddPhone &&
                <div className="add-phone" id="add-phone">
                    <h1>Add your awesome Book here</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='input' name="name" defaultValue="Programming Hero" ref={register} />
                        <br />
                        <input className='input' name="price" defaultValue="100 $" ref={register} />
                        <br />
                        <input className='input' name="exampleRequired" type="file" onChange={handleImageUpload} />
                        <br />
                        <input type="submit" />
                    </form>
                </div>
            }
            </div>
        </div>
    );
};

export default Admin;