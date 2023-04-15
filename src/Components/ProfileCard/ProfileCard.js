import React, { useState } from 'react';
import { Card, Avatar, Modal, Form, Input, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { HeartOutlined, HeartFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ProfileCard.css';

const { Meta } = Card;

const ProfileCard = ({ user, onLikeClick, onDeleteClick, onUpdateUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleLikeClick = (event) => {
    event.stopPropagation();
    onLikeClick(user.id);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    setIsModalVisible(true);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDeleteClick(user.id);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const updatedUser = { ...user, name: values.name, email: values.email,phone:values.phone,website:values.website };
    setIsModalVisible(false);
    form.resetFields();
    onUpdateUser(updatedUser); // call the onUpdateUser prop with the updated user data
  };

  return (
    <>
      <Card
        className="profile-card"
        bordered={true}
        cover={
          <div className="card-cover">
            <Avatar
              className="avatar"
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
            />
          </div>
        }
        onClick={handleEditClick}
        actions={[
          <div>
            {user.liked ? (
              <HeartFilled className="like-icon-filled" onClick={handleLikeClick} />
            ) : (
              <HeartOutlined className="like-icon-outlined" onClick={handleLikeClick} />
            )}
          </div>,
          <div >
            <EditOutlined className="action-icon" onClick={handleEditClick} />
          </div>,
          <div>
            <DeleteOutlined className="action-icon" onClick={handleDeleteClick} />
          </div>,
        ]}
      >
        <div className="profile-info">
            <Meta title={user.name} />
            <p><MailOutlined style={{marginRight:'8px',marginTop:'10px'}} /> {user.email}</p>
            <p><PhoneOutlined style={{marginRight:'8px'}}/> {user.phone}</p>
            <p><GlobalOutlined style={{marginRight:'8px'}}/>{user.website}</p>
        </div>
      </Card>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: "16px 0" }}>
            <h2 style={{ marginBottom: "16px" }}>Update User Information</h2>
            <Divider />
            <Form
            form={form}
            onFinish={onFinish}
            initialValues={{ name: user.name, email: user.email, phone:user.phone, website:user.website }}
            >
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input the user name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input the user email!' }]}
            >
                <Input />
                </Form.Item>

                <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please input the user Phone!' }]}
            >
                <Input />
                </Form.Item>
                <Form.Item
                name="website"
                label="Website"
                rules={[{ required: true, message: 'Please input the user website!' }]}
            >
                <Input />
                </Form.Item>
                
            </Form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileCard;
