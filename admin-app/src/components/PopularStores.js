import React from 'react'

const PopularStores = () => {
    const stores = [
        { name: "Digital House", likes: 66, image: "https://storage.googleapis.com/a1aa/image/JqyAFadcLD36SqcsiynTt_d9Dj3gMQvCXCfpGXzxxUI.jpg" },
        { name: "Mart House", likes: 66, image: "https://storage.googleapis.com/a1aa/image/Uc10KEj_Uyx2Fb3oVIlXYVo11F_CNCWbpqIAkDMAd-U.jpg" },
        { name: "Deluxe Offline", likes: 66, image: "https://storage.googleapis.com/a1aa/image/JllYOUiZl2GPWVR6j5X5MJ5jyV27b042gTeUjCP2GXc.jpg" },
        { name: "Wellness War", likes: 66, image: "https://storage.googleapis.com/a1aa/image/wWkIa4nrUMq76Jh80xKM7dTgwVF-rm6KSXVu7YoBSJ8.jpg" },
        { name: "Scam House", likes: 66, image: "https://storage.googleapis.com/a1aa/image/Uc10KEj_Uyx2Fb3oVIlXYVo11F_CNCWbpqIAkDMAd-U.jpg" }
      ];
    return (
    <>
    {/* <div className="container d-flex justify-content-center align-items-center vh-100"> */}
      <div className="p-3 shadow bg-light vh-100 rounded-3">
        {stores.map((store, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center p-4 mb-4 shadow-sm rounded" style={{backgroundColor:"#F6F5F5"}}>
            <div className="d-flex align-items-center">
              <img src={store.image} alt={store.name} className="me-3" width="40" height="40" />
              <span className="fw-semibold fs-5">{store.name}</span>
            </div>
            <div className="d-flex align-items-center text-danger">
              <span className="fw-semibold fs-5 me-2">{store.likes}</span>
              <i className="fas fa-heart fs-5"></i>
            </div>
          </div>
        ))}
      </div>
    {/* </div> */}
    </>
  )
}

export default PopularStores