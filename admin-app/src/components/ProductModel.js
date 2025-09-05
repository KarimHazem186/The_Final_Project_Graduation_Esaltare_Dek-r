// // Modal Component
// const Modal = ({ description, onClose }) => {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.3)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000,
//         }}
//         onClick={onClose}
//       >
//         <div
//           style={{
//             backgroundColor: "white",
//             padding: "20px",
//             boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//             width: "300px",
//             textAlign: "center",
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <p>{description}</p>
//           <button
//             onClick={onClose}
//             style={{
//               padding: "6px 10px",
//               backgroundColor: "#dc3545",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               borderRadius: "4px",
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   };
// export default Modal  



// Modal Component
const Modal = ({ description, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          maxWidth: "80%", // تقييد العرض لكي يكون مرنًا
          width: "300px",  // يمكنك تعديل العرض حسب الحاجة
          textAlign: "center",
          overflow: "hidden", // إخفاء أي محتوى زائد
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          style={{
            whiteSpace: "normal",  // السماح بتدفق النص إلى الأسطر الجديدة
            wordWrap: "break-word",  // التأكد من أن الكلمات الكبيرة تكسر إلى أسطر جديدة إذا كانت طويلة
            lineHeight: "1.6",  // تحسين المسافة بين الأسطر
          }}
        >
          {description}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "6px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;
