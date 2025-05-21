import React, { useEffect, useState } from "react";
import { Layout, Button, Space, Typography, Switch } from "antd";
import { LogoutOutlined, UserOutlined, BulbOutlined, BulbFilled } from "@ant-design/icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import "./styles.css";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AntHeader className="header">
      <div className="header-content">
        <div className="logo">
          <Text strong style={{ fontSize: "1.5rem", color: "var(--primary-color)" }}>
            CashFlow
          </Text>
        </div>
        <Space className="header-actions">
          <Button
            type="text"
            icon={darkMode ? <BulbFilled /> : <BulbOutlined />}
            onClick={() => setDarkMode((prev) => !prev)}
            className="theme-toggle-btn"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "Light" : "Dark"} Mode
          </Button>
          {user && (
            <>
              <Space>
                <UserOutlined />
                <Text>{user.email}</Text>
              </Space>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </Button>
            </>
          )}
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
