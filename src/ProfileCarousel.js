import React, { useState, useEffect } from 'react';
import { Carousel, Card, Avatar } from 'antd';

const { Meta } = Card;

const ProfileCarousel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <Carousel autoplay>
      {users.map((user) => (
        <Card key={user.id} style={{ width: 300 }}>
          <Meta
            avatar={<Avatar src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`} />}
            title={user.name}
            description={user.email}
          />
        </Card>
      ))}
    </Carousel>
  );
};

export default ProfileCarousel;