import React, { useState } from 'react';
// import '../index.css'
import { AiOutlineDashboard } from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
import { CiSignpostDuo1 } from "react-icons/ci";
import {  SiBrandfolder } from "react-icons/si";
import { FaCartArrowDown, FaClipboardList, FaHeart, FaProductHunt, FaRegUser, FaUser } from "react-icons/fa";
import { MdOutlineAdminPanelSettings, MdOutlineAnnouncement, MdOutlineCategory } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BsPersonVcard } from "react-icons/bs";
import { TfiAnnouncement, TfiEmail } from "react-icons/tfi";
// import { FaBagShopping } from "react-icons/fa6";
import { LuCalendarHeart } from "react-icons/lu";
import { MdReviews } from "react-icons/md";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
// import { PiUserSquareFill } from "react-icons/pi";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // UploadOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header1 from '../components/hearder';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
const { Header, Sider, Content } = Layout;
const App = () => {
  // const [selectedKey, setSelectedKey] = useState("");

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Layout>
        <Sider
          style={{
            background: "#08053B",
            height: "100vh",
            overflowY: "auto", // Enables vertical scroll
            position: "sticky",
            top: 0,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
        <div className="demo-logo-vertical logo" >
          <h2 className='fs-3 text-center py-3 mb-0'>
            <span className='lg-logo'>Esaltare Dekör </span>
            <span className='sm-logo'> Dekör HC </span>
          </h2>
        </div>
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>

        <Menu
        className='mt-3 mb-5'
          theme=""
          style={{ background: "#08053B",color:"white" }} // Set background for the menu
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key==='signout') {

            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon:<AiOutlineDashboard className='fs-4' />
              ,
              label: t('dashboard'),
            },
            
            {
              key: 'catalog',
              icon:<GrCatalog className='fs-5' />,
              label: t('catalog'),
              children:[
                {
                  key: 'categories',
                  icon:<BiCategory className='' />,
                  label: t('categoriesList'),
                },
                {
                  key: 'sub-categories',
                  icon:<MdOutlineCategory className='' />,
                  label: t('subCategoriesList'),
                },
                {
                  key: 'products',
                  icon:<FaProductHunt className='' />,
                  label: t('productsList'),
                },
                {
                  key: 'brands',
                  icon:<SiBrandfolder className='' />,
                  label: t('brandsList'),
                },
                {
                  key: 'posts',
                  icon:<CiSignpostDuo1 className='' />,
                  label: t('postsList'),
                },
              ]
            },
            {
              key: 'customers',
              icon:<FaRegUser className='fs-5' />,
              label: t('client'),
              children:[
                {
                  key: 'customers',
                  icon:<FaUser className='' />,
                  label: t('customersList'),
                },
                {
                  key: 'vendors',
                  icon:<BsPersonVcard className='' />,
                  label: t('vendorsList'),
                },
                {
                  key: 'vendors-panel',
                  icon:<MdOutlineAdminPanelSettings className='' />,
                  label: t('vendorsPanel'),
                },
              ]
            },

            {
              key: 'announcements',
              icon:<TfiAnnouncement className='fs-5' />,
              label: t('announcement'),
              children:[
                {
                  key: 'announcements',
                  icon:<MdOutlineAnnouncement className='' />,
                  label: t('announcementsList'),
                },
               
              ]
            },
            
          
            {
              key: 'orders',
              icon:<FaClipboardList className='fs-5' />,
              label: t('orders'),
              children:[
                {
                  key: 'orders',
                  icon:<FaCartArrowDown className='' />,
                  label: t('ordersList'),
                },
               
              ]
            },
            
          
            {
              key: 'market',
              icon:<FaHeart className='fs-5' />,
              label: t('marketing'),
              children:[
                {
                  key: 'coupons',
                  icon:<LuCalendarHeart className='' />,
                  label: t('couponsList'),
                },
               
              ]
            },
            
            {
              key: 'reviews',
              icon:<MdReviews className='fs-5' />,
              label: t('reviews'),
              children:[
                {
                  key: 'reviews',
                  icon:<BsBookmarkHeartFill className='' />,
                  label: t('reviewsList'),
                },
               
              ]
            },
            
            // {
            //   key: 'inbox',
            //   icon:<TfiEmail className='fs-5' />
            //   ,
            //   label: 'Inbox',
            // },
            {
              key: 'inbox',
              icon:<TfiEmail className='fs-5' />
              ,
              label:<Link className='text-white text-decoration-none' to="mailto:esaltaredekör@gmail.com" target="_blank" rel="noopener noreferrer">{t('inbox')}</Link>,
            },

            {
              key: 'setting',
              icon:<IoSettingsOutline className='fs-5' />
              ,
              label: t('setting'),
            },
            
          ]
        }
        />
       </div>
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between align-items-center ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined className='fs-5 p-3 mx-1' /> : <MenuFoldOutlined className='fs-5 p-3 mx-1' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          {/* <div className='d-flex align-items-center gap-3 profile'> */}
            {/* <h1>Esaltare Dekör HC</h1> */}
            {/* <div></div>
            <div className='d-flex align-items-center gap-3'>
              <div>
                <h5 className="mb-0">Hi, KArim</h5>
                <p className='mt-0'>kareemhazem99@gmail.com</p>
              </div>
              <div>
              <PiUserSquareFill className='admin_icon' /> */}
                {/* <img width={32} height={32} src="admin_icon.jpg" alt="Admin" /> */}
              {/* </div>
            </div>

          </div> */}
          <Header1 />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <main>
          <ToastContainer
            position='top-right'
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme='light'
          />
            <Outlet />
            <Footer />
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;