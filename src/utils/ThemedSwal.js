import Swal from "sweetalert2";
import "../Styles/swalStyles.css"; // path to your CSS

// A reusable function that applies your gradient theme
export const ThemedSwal = (options) =>
  Swal.fire({
    background: "transparent",
    color: "#fff",
    confirmButtonColor: "#3b82f6",
    customClass: {
      popup: "custom-swal-popup",
      title: "custom-swal-title",
      confirmButton: "custom-swal-button",
    },
    ...options,
  });
