import React, { useState, useEffect, useRef } from 'react';
import { Card, Avatar, Spin } from 'antd';
import './CardsContainer.css';
import ProfileCard from '../ProfileCard/ProfileCard';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';

const CardsContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        const data = await response.json();
        console.log("data",data)
        setUsers(data);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  if (loading || users.length == 0) {
    return <LoadingIndicator />;
  }

  const handleLikeClick = (userId) => {
    const updatedUser = users.map(user=>{
      if(user.id === userId){
        return {...user,liked:!user.liked}
      }
      return user
    })
    setUsers(updatedUser)
    // setLikedUsers([...likedUsers, likedUser]);
  };

  const handleDeleteClick = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="app-container">
      <div className="card-container">
        {users.map((user, index) => (
          <ProfileCard 
            key={index} 
            user={user} 
            onLikeClick={() => handleLikeClick(user.id)}
            onDeleteClick={() => handleDeleteClick(user.id)}
            onUpdateUser={updateUser}
            />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
