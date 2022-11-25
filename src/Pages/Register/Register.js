import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg'
import { AuthContext } from '../../context/AuthProvider';

const Register = () => {
    const {signup, updateUserProfile} = useContext(AuthContext);
    const handleRegister = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password, name);
        signup(email, password)
        .then(result => {
            const user = result.user;
            handleUpdateUserProfile(name);
            form.reset();
        })
        .catch(error => console.log(error));
    }
    const handleUpdateUserProfile = (name) =>{
        const profile = {
            displayName: name
        }
        updateUserProfile(profile)
        .then(() => {})
        .catch(error => console.log(error))

    }
    return (
        <div className="hero w-full my-20">
            <div className="hero-content gap-20 grid  md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={login} alt="" />
                </div>
                <div className="card py-12 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-4xl text-center font-bold">Sign Up</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required/>
                            
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Login" className="btn"/>
                        </div>
                    </form>
                    <p className='text-center'>Already have an account? <Link to='/login' className='text-orange-600 font-bold'>Login</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Register;