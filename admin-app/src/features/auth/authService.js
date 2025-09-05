import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
// import {config } from '../../utils/axiosconfig';



// // تحديث التوكن
// const refreshToken = async () => {
//     const response = await axios.get(`${base_url}user/refresh`, {
//       withCredentials: true,
//     });
//     if (response.data) {
//       localStorage.setItem("accessToken", response.data.accessToken);
//       return response.data.accessToken;
//     }
//     return null;
//   };
  
const userRegister = async (userData) => {
    try {
      const response = await axios.post(`${base_url}user/register`, userData,{  withCredentials: true, // important to handle cookies
    });
  
    if(response.data) {
        return response.data;
    }
    } catch (error) {
        console.error('User registration failed:', error.response?.data || error.message);
        throw error;
    }
};




const userLogin = async (userData) => {
    try {
        const response = await axios.post(`${base_url}user/login`, userData, {
            withCredentials: true, // إرسال الكوكيز مع الطلب
        });

        // تخزين الـ accessToken في localStorage
        localStorage.setItem("accessToken", response.data.token);

        // تخزين الـ refreshToken في الـ cookies (إذا كنت تستخدمها)
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=2592000`; // 30 days

        // تخزين بيانات المستخدم (إذا أردت)
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        console.error("User login failed:", error.response?.data || error.message);
        throw error;
    }
};

const adminLogin = async (adminData) => {
    try {
        const response = await axios.post(`${base_url}user/admin-login`, adminData, {
            withCredentials: true, // إرسال الكوكيز مع الطلب
        });

        // تخزين الـ accessToken في localStorage
        localStorage.setItem("accessToken", response.data.token);

        // تخزين الـ refreshToken في الـ cookies (إذا كنت تستخدمها)
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=2592000`; // 30 days

        // تخزين بيانات المسؤول (إذا أردت)
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        console.error("Admin login failed:", error.response?.data || error.message);
        throw error;
    }
};


export const getAllUsers = async () => {
  try {
      const response = await axios.get(`${base_url}user/all-users`, {
          withCredentials: true, // for session or token-based auth
      });

      return response.data;
  } catch (error) {
      console.error('Fetching users failed:', error.response?.data || error.message);
      throw error;
  }
};

export const getUserById = async (id) => {
  try {
      const response = await axios.get(`${base_url}user/get-user/${id}`,config);

      return response.data;
  } catch (error) {
      console.error(`Fetching user ${id} failed:`, error.response?.data || error.message);
      throw error;
  }
};

// console.log(getUserById("681723b60357ea02b7a66c3b"));

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${base_url}user/refresh`, {
        withCredentials: true, // Correctly placed within config object
      });
  
      if (response.data) {
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error.response?.data || error.message);
      throw error;
    }
  };
    
  
const forgotPassword = async (emailData) => {
    try {
      const response = await axios.post(`${base_url}user/forgot-password-token`, emailData);
      return response.data;
    } catch (error) {
      console.error('Error in forgotPassword:', error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || 'Failed to send password reset email');
    }
  };
   
// // Reset Password
const resetPassword = async (token, newPassword) => {
    console.log(token,newPassword) // token OK  but newPassword undefined
    try {
        const response = await axios.put(
            `${base_url}user/reset-password/${token}`,
            { password: newPassword },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data);
        return response.data;  // Return response data on success
    } catch (error) {
        // Properly handle the error and log the message
        console.error('Password reset failed:', error?.response?.data?.message || error.message);
    }
};
  
const getTokenFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

// Save Address
const saveAddress = async (address) => {
  try {
    const response = await axios.put(
      `${base_url}user/save-address`,
      { address },
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage ? getTokenFromLocalStorage.token : ''}`,
          Accept: "application/json",
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in saveAddress:', error?.response?.data?.message || error.message);
    throw new Error(error?.response?.data?.message || 'Failed to save address');
  }
};


const updatedUser = async (userData) => {
try {
    const response = await axios.put(`${base_url}user/update-user`, userData,{
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage ? getTokenFromLocalStorage.token : ''}`,
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      withCredentials: true,
    });
    if(response.data) {
      localStorage.setItem("user", JSON.stringify(response.data)); 
        return response.data;
    }
} catch (error) {
    console.error('User update failed:', error.response?.data || error.message)
    throw error;
}

};

const logout = async () => {
    await axios.post(`${base_url}user/logout`, null, {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
};


const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}user/delete-user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage ? getTokenFromLocalStorage.token : ''}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};



  const authService = {
    userRegister,
    refreshToken,
    adminLogin,
    userLogin,
    getAllUsers,
    getUserById,
    forgotPassword,
    resetPassword,
    saveAddress,
    updatedUser,
    logout,
    deleteUser,
  };
  
 export default authService;
