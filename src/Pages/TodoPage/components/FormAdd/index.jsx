import React from 'react'
import { Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

export default function FormAdd(props) {

  const onFinish = (values) => {
    props.onAdd(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please input the content!',
          },
        ]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item style={{
        'margin': '0px'
      }}>
        <Button type="primary" htmlType="submit" style={{
          'float': 'right'
        }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
