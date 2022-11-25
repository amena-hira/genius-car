import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user, logout} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    

    useEffect(()=>{
        fetch(`http://localhost:5000/orders?email=${user?.email}`,{
            headers:{
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                logout()
            }
            return res.json()
        })
        .then(data => setOrders(data))
    },[user?.email, logout])
    console.log(user?.email,orders);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure about cancel this order?')
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`,{
                method: 'DELETE',
                headers:{
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('deleted successfully');
                    const remaining = orders.filter(order => order._id !== id);
                    setOrders(remaining);
                }
            })
        }
    }

    const handleStatusUpdate = id =>{
        fetch(`http://localhost:5000/orders/${id}`,{
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // if (data.modifiedCount>0) {
                
            // }
            if (data.modifiedCount > 0) {
                const remaining = orders.filter(order => order._id !== id);
                const approving = orders.find(order => order._id === id);
                approving.status = 'Approved';
                const newOrders = [approving, ...remaining];
                setOrders(newOrders);
                

            }
        })
    }

    return (
        <div className='my-12'>
            <h2 className='text-4xl text-center mb-5'> You have: {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => <OrderRow 
                            key={order._id}
                            order={order}
                            handleDelete = {handleDelete}
                            handleStatusUpdate = {handleStatusUpdate}
                            ></OrderRow>)
                    }
                </tbody>
                
            </table>
            </div>
        </div>
    );
};

export default Orders;