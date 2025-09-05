import Swal from "sweetalert2";

// export const confirmDelete = async (entity, onConfirm) => {
//   const result = await Swal.fire({
//     title: `Delete ${entity}?`,
//     text: `Are you sure you want to delete this ${entity.toLowerCase()}? This action cannot be undone.`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: `Yes, delete ${entity.toLowerCase()}!`,
//   });

//   if (result.isConfirmed) {
//     try {
//       await onConfirm(); // Call the provided delete function
//       await Swal.fire({
//         title: "Deleted!",
//         text: `The ${entity.toLowerCase()} has been successfully deleted.`,
//         icon: "success",
//         confirmButtonColor: "#08053B",
//       });
//     } catch (error) {
//       await Swal.fire({
//         title: "Error!",
//         text: `Something went wrong while deleting the ${entity.toLowerCase()}.`,
//         icon: "error",
//         background: "#f8d7da",
//         confirmButtonColor: "#d33",
//       });
//     }
//   }
// };


export const confirmDelete = async (entity = "item", onConfirm) => {
  const itemName = entity || "item"; // Fallback to a default value

  const result = await Swal.fire({
    title: `Delete ${itemName}?`,
    text: `Are you sure you want to delete this ${itemName.toLowerCase()}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: `Yes, delete ${itemName.toLowerCase()}!`,
  });

  if (result.isConfirmed) {
    try {
      onConfirm(); // Call delete function
      await Swal.fire({
        title: "Deleted!",
        text: `The ${itemName.toLowerCase()} has been successfully deleted.`,
        icon: "success",
        confirmButtonColor: "#08053B",
      });
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: `Something went wrong while deleting the ${itemName.toLowerCase()}.`,
        icon: "error",
        background: "#f8d7da",
        confirmButtonColor: "#d33",
      });
    }
  }
};


