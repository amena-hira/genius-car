import React, { useContext } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Checkout = () => {
    const {_id, title, price} = useLoaderData();
    const {user} = useContext(AuthContext);
    
    const handlePlaceOrder = (event) =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;
        
        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        // if (phone.length > 11) {
        //     alert('phone number should be 10 characters')
            
        // }

        fetch('http://localhost:5000/orders',{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.acknowledged) {
                alert('Order placed successfully');
                form.reset();
            }
               
        })
    }
    return (
        <div className='mb-12 mt-20 '>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl text-center mb-2'>You are about to order - {title}</h2>
                <h4 className='text-3xl text-center mb-7'>Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" />
                    <input name='phone' type="number" placeholder="Your Phone" className="input input-bordered w-full" required/>
                    <input name='email' type="email" placeholder="Your Email" defaultValue={user?.email} readOnly className="input input-bordered w-full" />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full my-4" placeholder="Your Message"></textarea>
                <input type="submit" value="Submit" className='btn w-full' />
            </form>
        </div>
    );
};

export default Checkout;