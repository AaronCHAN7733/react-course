// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="home-container">
      <Navbar username={username} />
      <div className="content">
        <h2>Welcome to Home Page</h2>
      </div>
    </div>
  );
};

export default Home;
