import React from 'react'
import { StarFilled } from "@ant-design/icons";

const PopularProduct = () => {
    const products = [
        { id: 1, name: "Formia Boucle Curved", rating: 4.5, reviews: 5, image: "https://storage.googleapis.com/a1aa/image/Hlg4MatT8vpkwxmIsXBxWeLo0XkcspYhRMkKrkMuvu0.jpg" },
        { id: 2, name: "Formia Boucle Curved", rating: 4.5, reviews: 5, image: "https://storage.googleapis.com/a1aa/image/jaQIyoeMlJHDrgJLI_YrP-kd0fLy4pTIm0bJ3t5n9uI.jpg" },
        { id: 3, name: "Formia Boucle Curved", rating: 4.5, reviews: 5, image: "https://storage.googleapis.com/a1aa/image/bmCLDMCK-Ei1OXQjoU_srAPYWoAPneniVMMo9Eeb07Q.jpg" },
        { id: 4, name: "Formia Boucle Curved", rating: 4.5, reviews: 5, image: "https://storage.googleapis.com/a1aa/image/rlfd6g6gBBF05iu-vOx0MKdc-HKoK6PBOjCJD3N5e-8.jpg" },
        { id: 5, name: "Formia Boucle Curved", rating: 4.5, reviews: 5, image: "https://storage.googleapis.com/a1aa/image/BrAggini5uewBDsry9d2vzrzqL03SRxE4oSWxwAYb9Y.jpg" },
        { id: 6, name: "Formia Boucle Curved", rating: 4.5, reviews: 5, image: "https://storage.googleapis.com/a1aa/image/u9YRVmjlryh93lHTbCWm_rtbsuej5UeC2TW6Exc3Dsc.jpg" }
      ];
    return (
    <>
        <div className="d-grid p-3 shadow bg-light vh-100 rounded-3" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
      {products.map((product) => (
        <div key={product.id} className="d-flex flex-column align-items-center w-100">
          <div className="shadow-sm border-0 p-2 w-100 h-100 d-flex flex-column align-items-center" style={{ backgroundColor: "#F6F5F5" }}>
            <img src={product.image} alt={product.name} className="card-img-top" style={{ height: "100px", objectFit: "cover" }} />
            <div className="text-center w-100">
              <h5 className='mt-1' style={{ fontSize: "13px", color: "#000" }}>{product.name}</h5>
              <div className="d-flex justify-content-center align-items-center">
                <StarFilled className="text-warning" />
                <span className="ms-1 text-warning fw-bold">{product.rating}</span>
                <span className="text-muted ms-2">({product.reviews} Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>          
    </>
  )
}

export default PopularProduct