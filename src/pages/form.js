import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import logo from '../Img/laoji.jpeg';


const MyForm = () => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = (values) => {
    console.log('Received values:', values);
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
       <div  style={{ display: 'flex', justifyContent: 'Center' }}> <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} /> {/* Your logo */}</div>
      {!submitted ? (
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={<span style={{ fontWeight: 'bold', color: 'gold' }}>සේවාදායකයාගේ නම</span>}
            name="name"
            rules={[{ required: true, message: '' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label={<span style={{ fontWeight: 'bold', color: 'gold' }}>පදිංචි ප්‍රදේශය?</span>}
            name="area"
            rules={[{ required: true, message: '' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 'bold', color: 'gold' }}>ඔබ භාවිතා කරන තේ කොළ වර්ගය කුමක්ද?</span>}
            name="tea"
            rules={[{ required: true, message: '' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 'bold', color: 'gold' }}>ඔබ දිනකට පානය කරන තේ කෝප්ප ගණන කීයද?</span>}
            name="amount"
            rules={[{ required: true, message: '' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'gold', borderColor: 'gold', color: 'red' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Thank you for your submission!</h2>
        </div>
      )}
    </div>
  );
};

export default MyForm;
