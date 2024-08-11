import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import '../Styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username,
        phone,
        email
      });

      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input 
          type="text" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Phone Number" 
          required 
        />
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        <button onClick={handleLogin}>Already have an account? Login here</button>
      </div>
    </div>
  );
};

export default Register;
