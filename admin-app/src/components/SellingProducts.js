import React from 'react'

const SellingProducts = () => {
    const products = [
        { id: 1, name: "Formia Boucle Curved", sold: 20, image: "https://storage.googleapis.com/a1aa/image/cWC0aZUFiMf8Br9h92rKIT6AzHvEi9AGbNX5paGzXZI.jpg" },
        { id: 2, name: "Formia Boucle Curved", sold: 20, image: "https://storage.googleapis.com/a1aa/image/s6PsW4AchoxbX-5wC-GE_9nKhcoOIAC-woWTPSR0roE.jpg" },
        { id: 3, name: "Formia Boucle Curved", sold: 20, image: "https://storage.googleapis.com/a1aa/image/iFVQV66F2DACGKRrUKDGW31b1-nz7kp22Z-dgQDIQmU.jpg" },
        { id: 4, name: "Formia Boucle Curved", sold: 20, image: "https://storage.googleapis.com/a1aa/image/9a11bo0EFaWsz364D0Qa5xQdsM9ihxGH59svoB9nptE.jpg" },
        { id: 5, name: "Formia Boucle Curved", sold: 20, image: "https://storage.googleapis.com/a1aa/image/SBj163IA_K4t3ozKu3adPQOVkYiu5_KEmP4d06VAVL8.jpg" }
      ];
    return (
    <>
    <div className='p-3 shadow bg-light vh-100 rounded-3' style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "20px", backgroundColor: "#f4f4f4" }}>
      {products.map((product) => (
        <div key={product.id} className='rounded shadow-sm' style={{ display: "flex", alignItems: "center", backgroundColor: "#F6F5F5", padding: "16px", borderRadius: "8px", width: "100%", maxWidth: "400px" }}>
          <img src={product.image} alt={product.name} style={{ width: "130px", height: "90px", borderRadius: "4px", objectFit: "cover" }} />
          <div style={{ marginLeft: "16px", flex: "1" }}>
            <h2 className='mb-3' style={{ fontSize: "12px", fontWeight: "bold", color: "#333", margin: "0" }}>{product.name}</h2>
            <div style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}><span className='shadow-sm p-2 fw-bold' style={{backgroundColor:"#ECF0F2",marginTop:"10px"}}> Sold: {product.sold}</span></div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default SellingProducts