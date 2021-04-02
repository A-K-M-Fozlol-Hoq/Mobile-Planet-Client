import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Order.css'

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [ bookings, setBookings ]= useState([]) 
    useEffect(()=>{
        fetch('https://vast-bayou-76386.herokuapp.com/orders?email='+loggedInUser.email,{
            method:'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
        .catch(err =>{
            alert('Error ocured, please Login again to see your all order')
        })
    },[])
    return (
        <div className='order'>
            <h3>You have {bookings.length} orders</h3>
            {console.log(bookings)}
            {
                // bookings.map(book => <li key={book._id}>Name:{bookings[0].name} </li>)
                bookings.map(book => <li key={book._id}>[Name:{bookings[0].name}] [ordered at - {bookings[0].orderTime}]  . [Product(Phone) Name: {bookings[0].product.name}] , [Product Price{bookings[0].product.price}]</li>)
            }
        </div>
    );
};

export default Order;