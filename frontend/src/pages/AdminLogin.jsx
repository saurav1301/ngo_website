import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import '../styles/AdminLogin.css';
import {signupwithgoogle,login} from '../firebase/firebase'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux"
import { login as authLogin } from '../store/authSlice'
import { useSelector } from "react-redux";

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedOut, setLockedOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const isAdminLoggedIn = useSelector((state) => state.auth.status);
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
  useEffect(() => {
    console.log("(((((((((((((((((((((",isAdminLoggedIn)
    if (isAdminLoggedIn) {
      navigate('/admin-login');
    }
  }, [isAdminLoggedIn, navigate]);

  const {register,handleSubmit,watch,setValue,control,getValues,reset} = useForm({
    defaultValues:{
        email:'',
        password:'',
    }
  })

  const validUsername = 'admin';
  const validPassword = '123';

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if locked out
    if (lockedOut) {
      setError('You are locked out. Please wait 30 seconds.');
      setIsModalOpen(true);
      return;
    }

    // Validate username and password
    if (username === validUsername && password === validPassword) {
      // Store admin login status in localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      // Redirect to Admin page
      window.location.href = '/admin';
    } else {
      // Incorrect login, increase attempt count
      setAttempts(attempts + 1);
      setError('Incorrect username or password.');
      setIsModalOpen(true);

      // Lock out after 3 attempts
      if (attempts >= 2) {
        setLockedOut(true);
        setTimeout(() => {
          setLockedOut(false);
          setAttempts(0); // Reset attempts after lockout
        }, 30000); // Lockout for 30 seconds
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError('');
  };
  const submit= async (data)=>{
    console.log(data)
    const result = await login(data)
    console.log("%%%%%%%%%%%%%",result)
    if(result){
      // dispatch(authLogin(result))
      navigate("/admin-login")
      localStorage.setItem('adminLoggedIn', 'true');
    }
    reset()
  }

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              {...register("email", { required: true })}
            />
             <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              // value={formData.email}
              // onChange={handleChange}
              {...register("password", { required: true })}
            />
          </div>
          <button type="submit" className="volunteer-button">Log In</button>
        </form>
      {/* <button onClick={signupwithgoogle }>signin with google</button> */}

      {/* <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        <button type="submit">Login</button>
      </form> */}
      {/* Modal for error message */}
      <Modal isOpen={isModalOpen} onClose={closeModal} message={error} />
    </div>
  );
};

export default AdminLogin;
