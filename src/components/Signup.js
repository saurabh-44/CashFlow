import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Form, Input, Button, Card, Typography, Divider, Space, message } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const SignUpSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const createUserDocument = async (user, userName = '') => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName || userName || email.split('@')[0],
          email,
          photoURL: photoURL || "",
          createdAt,
        });
        toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/dashboard");
        toast.success("Logged In Successfully!");
      } else {
        const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await createUserDocument(result.user, values.name);
        toast.success("Successfully Signed Up!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error.message);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user);
      toast.success("User Authenticated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={2} style={{ margin: 0, color: "var(--primary-color)" }}>
            CashFlow
          </Title>
          <Text type="secondary">
            {isLogin ? "Welcome back! Please login to your account." : "Create your account to get started."}
          </Text>
        </div>

        <Form
          name="auth"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="auth-form"
        >
          {!isLogin && (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          {!isLogin && (
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="auth-button"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </Form.Item>
        </Form>

        <Divider>or</Divider>

        <Button
          icon={<GoogleOutlined />}
          onClick={signInWithGoogle}
          block
          loading={loading}
          className="google-button"
        >
          Continue with Google
        </Button>

        <div className="auth-footer">
          <Text type="secondary">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Button type="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUpSignIn;
