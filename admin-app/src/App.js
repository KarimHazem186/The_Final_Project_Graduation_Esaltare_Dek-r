import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./pages/MainLayout";
import Signup from "./pages/Signup";
import Setting from "./pages/Setting";
import "./App.css";
import Inbox from "./pages/Inbox";
import ReviewList from "./pages/Reviewlist";
import Couponlist from "./pages/Couponlist";
import Newcoupon from "./pages/Newcoupon";
import 'react-toastify/dist/ReactToastify.css';
import EditCoupon from './pages/Editcoupon';
import Orderlist from './pages/Orderlist';
import Orderdetail from './pages/Orderdetail';
import Announcementlist from './pages/Announcementlist';
import Newannouncement from './pages/Newannouncement';
import { ToastContainer } from 'react-toastify';
import Editannouncement from './pages/Editannouncement';
import Customerlist from './pages/Customerlist';
import Vendorlist from './pages/Vendorlist';
import Vendorpanel from './pages/Vendorpanel';
import Customerdetails from './pages/Customerdetails';
import Vendordetails from './pages/Vendordetails';
import { Productlist } from './pages/Productlist';
import Categorylist from './pages/Categorylist';
import SubCategorylist from './pages/SubCategorylist';
import Brandlist from './pages/Brandlist';
import Postlist from './pages/Postlist';
import NewCategory from './pages/Newcategory';
import EditCategory from './pages/Editcategory';
import Newproduct from './pages/Newproduct';
import Editproduct from './pages/Editproduct';
import Newsubcategory from './pages/Newsubcategory';
import Editsubcategory from './pages/Editsubcategory';
import Editbrand from './pages/Editbrand';
import Newbrand from './pages/Newbrand';
import Newpost from './pages/Newpost';
import Editpost from './pages/Editpost';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NotFound from './pages/NotFound';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);
  return (
    
    <BrowserRouter>
    {/* <ToastContainer autoClose={3000} /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        
        {/* Admin Layout with Nested Routes */}
        <Route path="/admin" element={<MainLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="setting" element={<Setting />} />

          <Route path="inbox" element={<Inbox />} />

          <Route path="categories" element={<Categorylist />} />
          <Route path="categories/new-category" element={<NewCategory />} />
          <Route path="categories/edit-category/:id" element={<EditCategory />} />

          <Route path="sub-categories" element={<SubCategorylist />} />
          <Route path="sub-categories/new-subcategory" element={<Newsubcategory />} />
          <Route path="sub-categories/edit-subcategory/:id" element={<Editsubcategory />} />

          <Route path="products" element={<Productlist />} />
          <Route path="products/new-product" element={<Newproduct />} />
          <Route path="products/edit-product/:id" element={<Editproduct />} />

          <Route path="brands" element={<Brandlist />} />
          <Route path="brands/new-brand" element={<Newbrand />} />
          <Route path="brands/edit-brand/:id" element={<Editbrand />} />

          <Route path="posts" element={<Postlist />} />
          <Route path="posts/new-post" element={<Newpost />} />
          <Route path="posts/edit-post/:id" element={<Editpost />} />

          <Route path="customers" element={<Customerlist />} />
          <Route path="customers/customer-detail/:id" element={<Customerdetails />} />
          <Route path="vendors" element={<Vendorlist />} />
          <Route path="vendors/vendor-detail/:id" element={<Vendordetails />} />
          <Route path="vendors-panel/vendor-detail/:id" element={<Vendordetails />} />
          
          
          <Route path="vendors-panel" element={<Vendorpanel />} />

          <Route path="announcements" element={<Announcementlist />} />
          <Route path="announcements/new-announcement" element={<Newannouncement />} />
          <Route path="announcements/edit-announcement/:id" element={<Editannouncement />} />

          <Route path="orders" element={<Orderlist />} />
          <Route path="orders/order-detail/:id" element={<Orderdetail />} />

          <Route path="coupons" element={<Couponlist />} />
          <Route path="coupons/new-coupon" element={<Newcoupon />} />
          <Route path="coupons/edit-coupon/:id" element={<EditCoupon />} />
          
          <Route path="reviews" element={<ReviewList />} />
          </Route>

        {/* Handle Undefined Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
