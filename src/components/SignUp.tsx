import React from "react";
import { Form, Input, Button } from "antd";
import {  UserRegisterForm } from "../types/user";
import api from "../utils/api";
import { useHistory } from "react-router-dom";
import showError from "../utils/showError";

function SignUp() {
    const {push}=useHistory();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  const onFinish = async(values: UserRegisterForm) => {
   try {
  console.log("values: ",values);
   await api().post("users/register",values)
   //push("/login",{state:{newSignUp:true}});
   //  history.push("/login", { newSignUp: true });
   push("/login", { newSignUp: true });
   } catch (error) {
       
       showError("Username used by someoneelse")
   }
    

  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"username"}
        label="Username"
        rules={[{ required: true, message:"Password cannot be empty" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"password"}
        label="Password"
        rules={[{ required: true,message:"Password cannot be empty and less than 6 characters", min:6 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[{ type:"email", required: true }]}
      >
        <Input />
      </Form.Item>
    
      <Form.Item name={"full_name"} label="FullName">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default SignUp;

