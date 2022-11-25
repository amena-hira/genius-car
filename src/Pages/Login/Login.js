import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/images/login/login.svg';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const {login} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    console.log(location.state?.from);
;    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        login(email,password)
        .then(result => {
            const user = result.user;

            const currentUser = {
                email: user.email
            }
            console.log(currentUser);

            fetch('http://localhost:5000/jwt',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data =>{
                console.log("token",data.token);
                localStorage.setItem('genius-token', data.token);
                navigate(from, {replace:true})
                
            })
            .catch(error => console.log(error))

           
        })
        .catch(error => console.log(error));
    }
    return (
        <div className="hero w-full my-20">
            <div className="hero-content gap-20 grid  md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={loginImage} alt="" />
                </div>
                <div className="card py-12 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-4xl text-center font-bold">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href=" " className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Login" className="btn"/>
                        </div>
                    </form>
                    <p className='text-center'>New to Genius Car? <Link to='/register' className='text-orange-600 font-bold'>Register</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;