import { Form, Input, Button, Result } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AppState } from "../store";
import { login } from "../store/actions/userActions";
import { UserLoginForm } from "../types/user";
import showError from "../utils/showError";
import showSuccess from "../utils/showSuccess";

export default function Login() {
  const history=useHistory();
  const dispatch=useDispatch();
  const {data,loading,error}=useSelector((state:AppState)=>state.user)
  console.log("data: ", data);
  // const location = useLocation<{ newSignUp?: boolean }>();
  // console.log("location: ",location)
  const location = useLocation();
  const { state } = location as { state: { newSignUp?: boolean } };
  console.log("state: ", state);

  const onFinish = (values: UserLoginForm) => {
    console.log("Success:", values);
    dispatch(login(values))
  };

useEffect(()=>{
    data.username && showSuccess("You have successfully logged in!")
},[data])

  useEffect(() => {
    error && showError(error)
   }, [error])

   useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token)return  history.push("/")
   },[data])
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
   
      autoComplete="off"
    >
      {state?.newSignUp && (
        <Result
          status="success"
          title="You signed up successfully!"
          subTitle="Please login by using your credentials"
        />
      )}

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
