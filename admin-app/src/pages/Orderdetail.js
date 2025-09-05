import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";

const Orderdetail = () => {
  // Default order object
  const defaultOrder = {
    id: "80294",
    date: "January 5, 2025 at 11:43 PM",
    items: [
      {
        name: "Beech wood dining chair",
        image: "https://storage.googleapis.com/a1aa/image/_eJ0FNZeWeYloEyGnedy8plruqAk8dL5bi4f5c2NP0s.jpg",
        quantity: 1,
        price: "8,200"
      }
    ],
    subtotal: "16,400",
    storeCredit: "-200.00",
    shipping: "100.00",
    total: "16,300",
    paymentStatus: "Paid",
    fulfillmentStatus: "Partially Fulfilled",
    customer: {
      name: "SZK Customer",
      firstOrder: true,
      contactName: "SZK ADMSAG",
      email: "SZKADMSAG@gmail.com",
      phone: "(+20)105497562"
    },
    shippingAddress: {
      street: "Street 1254 Building 14 Street",
      country:"Cairo, Egypt",
      postalCode: "12345"
    },
    billingAddress: {
      street: "Street 1254 Building 14 Street", 
      country:"Cairo, Egypt",
      postalCode: "12345"
    }
  };

  // Initialize state with default order
  const [order, setOrder] = useState(defaultOrder);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch("https://api.example.com/orders/80294");
        const data = await response.json();
        setOrder(data); // Update with fetched order
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <>
    <Meta title="Order Details" />
    <div className="container py-4">
      <div className="card p-4 shadow-sm">
        <h1 className="h4">Order #{order.id}</h1>
        <hr className="mb-1" />
        <p className="text-muted small mt-0">
          {order.date} | {order.items.length} items : Total {order.total} |
          <span className="badge bg-success ms-2">{order.paymentStatus}</span>
          <span className="badge bg-warning text-dark ms-2">{order.fulfillmentStatus}</span>
        </p>
        <hr className="mb-4" style={{ marginTop: "-10px" }} />

        {/* Notes Section */}
        <div className="position-relative">
          <textarea
            className="form-control mb-4 bg-white custom-textarea"
            rows="3"
            placeholder="Notes about order"
            style={{ paddingRight: "40px" }}
          ></textarea>
          <img
            src="/wirte.png"
            alt="write note"
            className="position-absolute text-secondary"
            style={{
              width: "30px",
              height: "30px",
              bottom: "36px",
              right: "12px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </div>

        {/* Items Section */}
        <div className="row">
          <div className="col-md-8">
            <div className="card p-4 mb-4 shadow-sm">
              <h2 className="h5 mb-3">Items</h2>
              {order.items.map((item, index) => (
                <div className="d-flex align-items-center mb-3" key={index}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="me-3"
                    width="60"
                    height="60"
                  />
                  <div className="flex-grow-1">
                    <strong>{item.name}</strong>
                  </div>
                  <div className="d-flex justify-content-end align-items-center text-center">
                    <span className="ms-3 mx-5 fw-semibold">
                      <span className="fw-semibold">Count</span>
                      <br /> {item.quantity}
                    </span>
                    <span className="ms-3 fw-semibold">
                      <span className="fw-semibold">Price</span>
                      <br /> {item.price}
                    </span>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Subtotal</strong>
                <span>{order.subtotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Store Credit</strong>
                <span>{order.storeCredit}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Shipping</strong>
                <span>{order.shipping}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong className="fs-3">Total</strong>
                <span className="fw-bold fs-4">{order.total}</span>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="col-md-4">
            <div className="card p-4 mb-3 shadow-sm">
              <div className="d-flex align-items-center">
                <img
                  src="/user (1).png"
                  alt="profile"
                  className="me-3 mb-3"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <strong>{order.customer.name}</strong>
                  <p className="text-muted small">{order.customer.firstOrder ? "This is the first order" : "Returning customer"}</p>
                </div>
              </div>
            </div>
            <div className="card p-4 mb-3 shadow-sm">
              <h5>Contact Person</h5>
              <p className="mb-1">{order.customer.contactName}</p>
              <p className="mb-1">{order.customer.email}</p>
              <p>{order.customer.phone}</p>
            </div>
            <div className="card p-4 mb-3 shadow-sm">
              <h5>Shipping Address</h5>
              <p className="mb-1">{order.shippingAddress.street}</p>
              <p className="mb-1">{order.shippingAddress.country}</p>
              <p>Postal Code: {order.shippingAddress.postalCode}</p>
            </div>
            <div className="card p-4 shadow-sm">
              <h5>Billing Address</h5>
              <p className="mb-1">{order.billingAddress.street}</p>
              <p className="mb-1">{order.billingAddress.country}</p>
              <p >Postal Code: {order.billingAddress.postalCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Orderdetail;

