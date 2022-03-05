import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { MainWrapper } from "./ProfileSC";
import { Form, Input, Space, Button } from "antd";
import { useHistory } from "react-router-dom";
import { actions, GlobalContext } from "../../App";
import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../Signup/Signup.css";
import { FormProvider } from "antd/lib/form/context";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import apiList from "../../lib/apiList";

const Profile = () => {
  const [formStatus, setFormStatus] = useState("idle");
  const [avatarImg, setAvatarImg] = useState();
  const buttonValues = {
    idle: {
      text: "Update Account",
      loading: false,
      icon: <PlusCircleOutlined />,
    },
    loading: { text: "Updating Account", loading: true, icon: null },
    success: {
      text: "Account Updated",
      loading: false,
      icon: <CheckCircleOutlined />,
    },
    failed: {
      text: "Account Updated Failed",
      loading: false,
      icon: <CloseCircleOutlined />,
    },
  };
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const {
    state: { user },
    dispatch,
  } = useContext(GlobalContext);

  const [userInfo, setUserInfo] = useState({
    username: user.username,
    email: user.email,
  });

  const history = useHistory();

  console.log({ user });

  const handleUpdate = async () => {
    const { data } = await axios.put(`${apiList.user}/${user._id}`, {
      ...userInfo,
    });

    console.log({ data });
  };

  return (
    <MainWrapper>
      <h1 className="text-center"> Update your profile</h1>
      <ImgCrop rotate>
        <Upload
          className="Image-container"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <div className="signup-container">
        <Form name="signup" layout="vertical" size="large">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input a username." }]}
          >
            <Input
              defaultValue={userInfo.username}
              className="form-input"
              placeholder="Enter a username"
              onChange={(e) =>
                setUserInfo((oldUserInfo) => ({
                  ...oldUserInfo,
                  username: e.target.value,
                }))
              }
            />
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
            <Input
              defaultValue={user.email}
              className="form-input"
              placeholder="Enter an email address"
              onChange={(e) =>
                setUserInfo((oldUserInfo) => ({
                  ...oldUserInfo,
                  email: e.target.value,
                }))
              }
              //   value={user.email}
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{}]}>
            <Input.Password
              className="form-input"
              placeholder="Enter a password"
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{}]}
          >
            <Input.Password
              className="form-input"
              placeholder="Re-enter your password"
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            // loading={buttonValues[formStatus].loading}
            icon={buttonValues[formStatus].icon}
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            {buttonValues[formStatus].text}
          </Button>
        </Form>
      </div>
    </MainWrapper>
  );
};

export default Profile;
