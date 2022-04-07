import { useState, useEffect } from "react";
import { Form, Input, Space, Button } from "antd";
import { useHistory } from "react-router-dom";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./Signup.css";
import { FormProvider } from "antd/lib/form/context";
import AvatarUpload from "./AvatarUpload";
import axios from "axios";
import apiList from "../../lib/apiList";
import AppUpload from "../Avatar/AppUpload";
const Signup = (props) => {
  const [formStatus, setFormStatus] = useState("idle");
  const [avatarImg, setAvatarImg] = useState();
  const buttonValues = {
    idle: {
      text: "Create Account",
      loading: false,
      icon: <PlusCircleOutlined />,
    },
    loading: { text: "Creating Account", loading: true, icon: null },
    success: {
      text: "Account Created",
      loading: false,
      icon: <CheckCircleOutlined />,
    },
    failed: {
      text: "Account Creation Failed",
      loading: false,
      icon: <CloseCircleOutlined />,
    },
  };
  const [imagePath, setImagePath] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (props.user) {
      history.push("/");
    }
  }, []);

  const onFinish = async (values) => {
    setFormStatus("loading");
    // post data
    // fetch("http://localhost:5000/user/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ ...values, avatarImg }),
    // })

    try {
      const { data } = await axios.post(apiList.signup, {
        ...values,
        avatarImg,
        imageUrl: imagePath,
      });

      if (data.success) {
        setFormStatus("success");
        props.setUser(data.user);
        window.sessionStorage.setItem("currentUser", JSON.stringify(data.user));
        history.push("/");
      } else {
        setFormStatus("failed");
      }
    } catch (error) {
      setFormStatus("failed");
    }
    // .then((data) => {

    // })
    // .catch((err) => {
    //   setFormStatus("failed");
    // });
  };

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>
      {/* <AvatarUpload
          avatarImg={avatarImg}
          setImagePath={setImagePath}
          setAvatarImg={setAvatarImg}
        /> */}
      <AppUpload setInput={setImagePath} input={imagePath} />
      <Form name="signup" onFinish={onFinish} layout="vertical" size="large">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input a username." }]}
        >
          <Input className="form-input" placeholder="Enter a username" />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "A valid email address is required to signup.",
            },
          ]}
        >
          <Input className="form-input" placeholder="Enter an email address" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{}]}>
          <Input.Password
            className="form-input"
            placeholder="Enter a password"
          />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword" rules={[{}]}>
          <Input.Password
            className="form-input"
            placeholder="Re-enter your password"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={buttonValues[formStatus].loading}
          icon={buttonValues[formStatus].icon}
          className="btn btn-primary"
        >
          {buttonValues[formStatus].text}
        </Button>
        <p className="form-text">
          Already have an account?{" "}
          <a href="/login" className="form-link">
            Log in
          </a>
        </p>
      </Form>
    </div>
  );
};

export default Signup;
