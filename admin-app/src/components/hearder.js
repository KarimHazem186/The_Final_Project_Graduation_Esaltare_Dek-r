import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Avatar, Badge } from "@mui/material";
import { Search, Notifications } from "@mui/icons-material";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from 'react-redux';
import { userLogout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [notificationCount] = useState(3); // Example count
  const [activeItem, setActiveItem] = useState(null); // Track clicked item
  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("appLanguage", lang);
  };

  const languages = [
    { key: "en", label: "English", flag: "https://storage.googleapis.com/a1aa/image/4G5D2_pUX1dT2tjF_qyTPbIKyIUjfVhYFL5GHJ4QqVU.jpg" },
    { key: "ar", label: "العربية", flag: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" }
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage");
    if (savedLang) {
      setSelectedLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, []);
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap(); // unwrap to catch errors
      toast.success("Successfully logged out!"); // Success toast
      setTimeout(()=>{
        navigate('/'); // Redirect to login page

      },1000)
    } catch (err) {
      toast.error("Logout failed: " + err.message); // Error toast
      console.error("Logout failed:", err);
    }
  };



  return (
    <AppBar
          position="static"
          className="bg-white shadow-sm"
          style={{
            width: i18n.language === "ar" ? "90%" : "99%",
            boxSizing: "border-box",
          }}
          color="default"
          elevation={1}
        >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Search Bar */}
        <div className="position-relative mx-4 d-flex align-items-center" style={{ width: i18n.language==="en"?"35%" : "40%"  , background: '#f0f0f0', borderRadius: '5px', padding: '5px'}}>
          <InputBase
            placeholder={t('search for items')}
            className="form-control ps-2"
            style={{ width: '80%', background: 'transparent', border: 'none' }}
          />
          <IconButton className="ms-2 text-muted" style={{ borderRadius: "0" }}>
            <Search className="search" />
          </IconButton>
        </div>

        {/* Language Selector, Notifications, User Profile */}
        <div className="wrapper-2 d-flex align-items-center justify-content-between" style={{ width: '55%' }}>
          {/* Language Selector */}
          <div style={{marginRight: i18n.language=== "en" ? "0" : "50px"}}>
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                className="d-flex align-items-center"
                style={{
                  background: "#120e3b",
                  color: "#FFF",
                  border: "none",
                  boxShadow: "none",
                  borderRadius: "5px"
                }}
              >
                <img
                  src={languages.find(lang => lang.key === selectedLanguage).flag}
                  alt={selectedLanguage}
                  height={20}
                  width={20}
                  className="me-2"
                />
                {languages.find(lang => lang.key === selectedLanguage).label}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ border: "", boxShadow: "" }}>
                {languages.map(lang => (
                  <Dropdown.Item
                    key={lang.key}
                    onClick={() => changeLanguage(lang.key)}
                    style={{
                      background: selectedLanguage === lang.key ? "#120e3b" : "transparent",
                      color: selectedLanguage === lang.key ? "#FFF" : "#000",
                      textAlign: lang.key === "ar" ? "right" : "left",
                    }}
                  >
                    <img src={lang.flag} alt={lang.label} height={20} width={20} className="me-2" />
                    {lang.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* Notifications */}
          <div style={{ marginRight: "25px", marginLeft: i18n.language=== "en" ? "-10px" : "50px" }}>
            <IconButton>
              <Link to="/admin/inbox" className="d-flex align-items-center text-decoration-none" style={{ color: "#120e3b" }}>
                <Badge badgeContent={notificationCount} color="error">
                  <Notifications className="d-flex align-items-center fs-2" style={{ color: "#120e3b" }} />
                </Badge>
              </Link>
            </IconButton>
          </div>
          {/* User Profile */}
          <div style={{marginRight: i18n.language === "en" ? "0" : "-120px",marginLeft:i18n.language==="ar"?"20px" : "0"}}>
            <Dropdown>
              <Dropdown.Toggle as="div" className="d-flex align-items-center text-decoration-none" style={{ cursor: "pointer" }}>
                <div className="me-2">
                  <Typography variant="body1" color="textPrimary">
                    {t('admin')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="d-block">
                    {t('masterAdmin')}
                  </Typography>
                </div>
                <Avatar
                  src="https://storage.googleapis.com/a1aa/image/9B5PKJj4WcoUMRq_26C_uZ9PykXEdDy936evg2kb1ZY.jpg"
                  alt="Admin Avatar"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ border: "none", boxShadow: "none" }}>
                {["profile", "logout"].map((item) => (
                  <Dropdown.Item
                    key={item}
                    onMouseDown={() => setActiveItem(item)} // Change on click
                    onMouseUp={() => setActiveItem(null)} // Reset after click
                    onClick={item === "logout" ? handleLogout : null} // Add handleLogout to logout item
                    style={{
                      background: activeItem === item ? "#120e3b" : "transparent",
                      color: activeItem === item ? "#FFF" : "#000",
                      borderRadius: "5px",
                      transition: "background 0.2s ease",
                }}
              >
            {item === "profile" ? "Profile" : "Logout"} {/* You can use `t('profile')` and `t('logout')` for translations */}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>

            </Dropdown>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

