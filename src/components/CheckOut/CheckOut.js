import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './CheckOut.css'
const CheckOut = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const { phoneKey } = useParams();
    const [phone, setPhone] = useState({});
    useState(() => {
        fetch('http://localhost:5055/phone/' + phoneKey)
            .then(res => res.json())
            .then(data => setPhone(data))
    }, [phoneKey])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext) 

    const onSubmit = data => {
        const orderDetails = { ...loggedInUser, product: phone, shipment: data, orderTime: new Date() }
        console.log(orderDetails)
        fetch('http://localhost:5055/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                alert('your order placed successfully')
            })
            .catch(err => console.log(err))
    };


    return (
        <div>
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input className='input' name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <span className="error">name is required</span>}
                <input className='input' name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
                {errors.email && <span className="error">email is required</span>}
                <input className='input' name="address" ref={register({ required: true })} placeholder="Your address" />
                {errors.address && <span className="error">address is required</span>}
                <input className='input' name="phone" ref={register({ required: true })} placeholder="Your phone" />
                {errors.phone && <span className="error">phone is required</span>}
                <input className='input' type="submit" />
            </form>
        </div>
    );
};

export default CheckOut;