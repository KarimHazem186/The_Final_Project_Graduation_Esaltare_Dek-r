import Meta from '../components/Meta';
import { useTranslation } from 'react-i18next';

const Setting = () => {
  const { t } = useTranslation();
  const settingsOptions = [
    { icon: "fas fa-globe", title: t("general_title"), description: t("general_desc") },
    { icon: "fas fa-shipping-fast", title: t("shipping_title"), description: t("shipping_desc") },
    { icon: "fas fa-credit-card", title: t("payment_title"), description: t("payment_desc") },
    { icon: "fas fa-users", title: t("users_title"), description: t("users_desc") },
    { icon: "fas fa-envelope", title: t("email_title"), description: t("email_desc") },
    { icon: "fas fa-coins", title: t("currency_title"), description: t("currency_desc") },
    { icon: "fas fa-language", title: t("languages_title"), description: t("languages_desc") },
    { icon: "fas fa-lock", title: t("privacy_title"), description: t("privacy_desc") },
    { icon: "fas fa-file-invoice-dollar", title: t("taxes_title"), description: t("taxes_desc") }
  ];
  

  


  return (
    <>
    <Meta title={t("settings")} />
    
    <div className="container py-2">
      <h3 className="mb-4">{t("settings")}</h3>
      <div className="row g-4">
        {settingsOptions.map((option, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4">
            <div className="card text-center p-4 shadow-sm h-100">
              <div className="mb-3">
                <i className={`${option.icon} fa-2x`}></i>
              </div>
              <h2 className="h5 mb-2">{option.title}</h2>
              <p className="text-muted">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Setting
