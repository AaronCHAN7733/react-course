import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Import auth and db
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import '../Styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      setUsers(usersList);

      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <Navbar username={username} />
      <h2>Registered Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td className="email">{user.email}</td>
              <td className="phone">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
