import React from 'react';
import Meta from '../components/Meta';
import BarChart from '../components/BarChart';
import LineChart1 from '../components/LineChart';
import PieChart1 from '../components/PieChart';
import TopCustomers from '../components/TopCustomers';
import { Popper } from '@mui/material';
import PopularStores from '../components/PopularStores';
import SellingStore from '../components/SellingStore';
import PopularProduct from '../components/PopularProduct';
import SellingProducts from '../components/SellingProducts';
import DeliveryMan from '../components/DeliveryMan';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
    <>
      <Meta title={t('dashboardTitle')} />
      {/* <div className="container mt-0" style={{ direction: isRTL ? 'rtl' : 'ltr' }}> */}
      <div className="container mt-0">
      <h3 className='mt-0'>{t('welcomeAdmin')}</h3>
      <p className="mb-4">{t('monitorBusiness')}</p>

        <div className="wrapper-1 shadow-sm p-4 bg-light rounded-3">
          <h5 className="mb-4 d-flex align-items-center">
            <img src="online-analytical.png" alt="Icon of Analytics" width="40" height="40" className="img-fluid" />
            <span className="mx-3 fs-4">{t('businessAnalytics')}</span>
          </h5>

          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 bg-white rounded-3 shadow" style={{ minWidth: '250px' }}>
              <div>
                <p className="fs-5 fw-semibold">{t('totalOrders')}</p>
                <p className="fs-2 fw-bold">100</p>
              </div>
              <img src="orders.png" alt="Icon of Orders" width="50" height="50" className="img-fluid" />
            </div>

            <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 bg-white rounded-3 shadow" style={{ minWidth: '250px' }}>
              <div>
                <p className="fs-5 fw-semibold">{t('totalStores')}</p>
                <p className="fs-2 fw-bold">100</p>
              </div>
              <img src="stores.png" alt="Icon of a Store" width="50" height="50" className="img-fluid" />
            </div>

            <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 bg-white rounded-3 shadow" style={{ minWidth: '250px' }}>
              <div>
                <p className="fs-5 fw-semibold">{t('totalProducts')}</p>
                <p className="fs-2 fw-bold">200</p>
              </div>
              <img src="products.png" alt="Icon of Products" width="50" height="50" className="img-fluid" />
              
            </div>

            <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 bg-white rounded-3 shadow" style={{ minWidth: '250px' }}>
              <div>
                <p className="fs-5 fw-semibold">{t('totalCustomers')}</p>
                <p className="fs-2 fw-bold">100</p>
              </div>
              <img src="consumers.png" alt="Icon of Customer" width="50" height="50" className="img-fluid" />
            </div>

        <div className="row g-3 mt-1">
          {/* Pending */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-success bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="pending.png"
                alt="Pending"
                width="32"
                height="32"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('pending')}</div>
              <div className='fw-bold'>60</div>
            </div>
          </div>

          {/* Confirmed */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-success bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="check.png"
                alt="Confirmed"
                width="32"
                height="32"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('confirmed')}</div>
              <div className='fw-bold'>21</div>
            </div>
          </div>

          {/* Packaging */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-success bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="package.png"
                alt="Packaging"
                width="32"
                height="32"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('packaging')}</div>
              <div className='fw-bold'>90</div>
            </div>
          </div>

          {/* Out for delivery */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-success bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="fast-delivery.png"
                alt="Out for delivery"
                width="42"
                height="42"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('outForDelivery')}</div>
              <div className='fw-bold'>190</div>
            </div>
          </div>

          {/* Delivered */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="delivered.png"
                alt="Delivered"
                width="32"
                height="32"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('delivered')}</div>
              <div className='fw-bold'>90</div>
            </div>
          </div>

          {/* Canceled */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="cancel.png"
                alt="Canceled"
                width="32"
                height="32"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('canceled')}</div>
              <div className='fw-bold'>90</div>
            </div>
          </div>

          {/* Returned */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="return.png"
                alt="Returned"
                width="32"
                height="32"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('returned')}</div>
              <div className='fw-bold'>90</div>
            </div>
          </div>

          {/* Failed to deliver */}
          <div className="col-6 col-sm-4 col-lg-3">
            <div className="d-flex align-items-center bg-primary bg-opacity-10 p-3 rounded shadow-sm">
              <img
                src="delete-button.png"
                alt="Failed to deliver"
                width="32"
                height="32"
                className="me-2"
              />
              <div className="flex-grow-1 fw-bold">{t('failedToDeliver')}</div>
              <div className='fw-bold'>90</div>
            </div>
          </div>

        </div>

          </div>
        </div>


    <div className="wrapper-1 shadow-sm p-4 bg-light rounded-3 mt-5">
      <h5 className="mb-4 d-flex align-items-center">
        <img src="wallet.png" alt={t('walletIconAlt')} width="35" height="35" className="me-2" />
        <span className='mx-1 fs-4'>{t('adminWallet')}</span>
      </h5>

      <div className="d-flex">
        <div className="col-lg-4 col-md-6 gap-4">
          <div className="p-4 rounded-3 shadow-sm text-center gap-4" style={{ marginRight: "20px", backgroundColor: "#E7F7F6" }}>
            <img
              src="financial-statement.png"
              alt={t('inHouseEarningsIconAlt')}
              width="72"
              height="72"
              className="mb-2"
            />
            <p className="fs-4 fw-bold mb-0 opacity-75">$22,111.00</p>
            <p className="text-muted mb-0 mt-0">{t('inHouseEarnings')}</p>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3 shadow-sm" style={{ minWidth: '250px', backgroundColor: "#EEF5FF" }}>
            <div className="me-3">
              <p className="fs-5 fw-bold mb-1 opacity-75">$10,333.01</p>
              <p className="text-muted mb-0">{t('commissionEarned')}</p>
            </div>
            <img src="wage.png" alt={t('commissionEarnedIconAlt')} width="50" height="50" className="img-fluid" />
          </div>

          <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3 shadow-sm" style={{ minWidth: '250px', backgroundColor: "#EEF5FF" }}>
            <div className="me-3">
              <p className="fs-5 fw-bold mb-1 opacity-75">$10,333.01</p>
              <p className="text-muted mb-0">{t('deliveryChargeEarned')}</p>
            </div>
            <img src="free-shipping.png" alt={t('deliveryChargeEarnedIconAlt')} width="50" height="50" className="img-fluid" />
          </div>

          <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3 shadow-sm" style={{ minWidth: '250px', backgroundColor: "#EEF5FF" }}>
            <div className="me-3">
              <p className="fs-5 fw-bold mb-1 opacity-75">$10,333.01</p>
              <p className="text-muted mb-0">{t('totalTaxCollected')}</p>
            </div>
            <img src="tax.png" alt={t('totalTaxCollectedIconAlt')} width="50" height="50" className="img-fluid" />
          </div>

          <div className="d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3 shadow-sm" style={{ minWidth: '250px', backgroundColor: "#EEF5FF" }}>
            <div className="me-3">
              <p className="fs-5 fw-bold mb-1 opacity-75">$10,333.01</p>
              <p className="text-muted mb-0">{t('pendingAmount')}</p>
            </div>
            <img src="money.png" alt={t('pendingAmountIconAlt')} width="50" height="50" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>


<div className="wrapper-3 rounded-3 mt-4">
  <div className="row d-flex flex-wrap justify-content-between align-items-between g-3">
    
    {/* Active Users Card */}
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="active-user shadow-sm p-4 bg-light rounded-3 text-center">
        <div className="card-body">
          <h2 className="card-title">{t('activeUsers')}</h2>
          <p className="display-4 bg-primary bg-opacity-10 py-4 rounded mb-4 mt-3 fw-bold">150</p>
          <div className="d-flex justify-content-between fw-bold border-bottom py-2">
            <span>{t('activePage')}</span>
            <span>{t('users')}</span>
          </div>
          {[
            { page: "/products/brands", users: 15 },
            { page: "/categories/product", users: 15 },
            { page: "/account/order", users: 15 },
            { page: "/cart", users: 15 },
            { page: "/checkout", users: 15 },
            { page: "/pages/about-us", users: 15 },
          ].map((item, index) => (
            <div key={index} className="d-flex justify-content-between border-bottom py-2">
              <span>{item.page}</span>
              <span>{item.users}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Income Statistics Chart */}
    <div className="col-lg-8 col-md-6 col-sm-12">
      <div className="shadow-sm p-4 bg-light rounded-3">
        <h3 className="mb-4"><img src='profit (2).png' alt='Icome Profit' width="40" height="40" className="me-2" />{t('incomeStatistics')}</h3> 
        <BarChart />
      </div>
    </div>

  </div>

</div>


<div className="wrapper-3 rounded-3 mt-4">
  <div className="row d-flex flex-wrap justify-content-between align-items-between g-3">
    
    <div className="col-lg-6 col-md-6 col-sm-12">
      <div className="shadow-sm p-4 bg-light rounded-3">
        <h3 className="mb-4"><img src='budget.png' alt={t('userOverview')} width="40" height="40" className="me-2" />{t('userOverview')}</h3> 
        
          <PieChart1 />

          <ul>
            <li className='li-customer fw-semibold'>{t('customer')} (20)</li>
            <li className='li-vendor fw-semibold'>{t('vendor')} (15)</li>
            <li className='li-delivery fw-semibold'>{t('deliveryMan')} (5)</li>
          </ul>

      </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-12">
      <div className="shadow-sm p-4 bg-light rounded-3">
        <h3 className="mb-4"><img src='statistics.png' alt={t('orderStatistics')}  width="40" height="40" className="me-2" />{t('orderStatistics')}  </h3>
        
        <LineChart1 />

      </div>
    </div>

  </div>
  
</div>

{/************************* */}


<div className="wrapper-3 rounded-3 mt-4">
      <div className="row d-flex flex-wrap g-3">
        
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="shadow-sm p-3 bg-light rounded-3 mb-3">
            <p className='d-flex align-items-center gap-2 fw-bold fs-4'>
              <img src='customer-review.png' alt={t('topCustomers')} width="40" height="40" className="me-2" /> {t('topCustomers')}
            </p>
          </div>
          <TopCustomers />
        </div>
        
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="shadow-sm p-3 bg-light rounded-3 mb-3">
            <p className='d-flex align-items-center gap-2 fw-bold fs-4'>
              <img src='grocery-store (1).png' alt={t('mostPopularStores')} width="40" height="40" className="me-2" /> {t('mostPopularStores')}
            </p>
          </div>
          <PopularStores />
        </div>
        
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="shadow-sm p-3 bg-light rounded-3 mb-3">
            <p className='d-flex align-items-center gap-2 fw-bold fs-4'>
              <img src='selling-shop (1).png' alt={t('topSellingStore')} width="40" height="40" className="me-2" /> {t('topSellingStore')}
            </p>
          </div>
          <SellingStore />
        </div>
        
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="shadow-sm p-3 bg-light rounded-3 mb-3">
            <p className='d-flex align-items-center gap-2 fw-bold fs-4'>
              <img src='love.png' alt={t('mostPopularProducts')} width="40" height="40" className="me-2" /> {t('mostPopularProducts')}
            </p>
          </div>
          <PopularProduct />
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="shadow-sm p-3 bg-light rounded-3 mb-3">
            <p className='d-flex align-items-center gap-2 fw-bold fs-4'>
              <img src='sale.png' alt={t('topSellingProducts')} width="40" height="40" className="me-2" /> {t('topSellingProducts')}
            </p>
          </div>
          <SellingProducts />
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="shadow-sm p-3 bg-light rounded-3 mb-3">
            <p className='d-flex align-items-center gap-2 fw-bold fs-4'>
              <img src='delivery-bike.png' alt={t('topDeliveryMan')} width="40" height="40" className="me-2" /> {t('topDeliveryMan')}
            </p>
          </div>
          <DeliveryMan />
        </div>
        
      </div>
    </div>



</div>



    </>
  );
};

export default Dashboard;
