import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCog, FaUser, FaHome } from "react-icons/fa";

const Footer = () => {
  const { t, i18n } = useTranslation();
  // const isRTL = i18n.language === 'ar';

  return (
    <footer className="py-3 px-4 d-flex justify-content-between align-items-center flex-wrap mt-5">
    {/* // <footer className="py-3 px-4 d-flex justify-content-between align-items-center flex-wrap mt-5" style={{ direction: isRTL ? 'rtl' : 'ltr' }}> */}
      <div className="text-dark fw-bold fs-5">
        Esaltare Dekor HC. Copyright ZSK@2025
      </div>
      <div className="d-flex flex-wrap gap-4 text-secondary mt-1">
        <div className="d-flex align-items-center gap-2">
          <FaCog className="fs-4" />
          <span className="fw-semibold">{t('businessSetup')}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <FaUser className="fs-4" />
          <span className="fw-semibold">{t('profile')}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <FaHome className="fs-4" />
          <span className="fw-semibold">{t('home')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
