import Swal from "sweetalert2";

export const showSuccessAlert = (message = "Done successfully!", html) => {
  const isDark = document.documentElement.classList.contains("dark");

  return Swal.fire({
    title: message,
    html,
    icon: "success",
    background: isDark ? "#101828" : "#fff",
    color: isDark ? "#fff" : "#000",
    confirmButtonColor: "#155dfc"
  });
};

export const showErrorAlert = (message = "Something Want Wrong Please Try Again Later!", html) => {
  const isDark = document.documentElement.classList.contains("dark");

  return Swal.fire({
    title: message,
    html,
    icon: "error",
    background: isDark ? "#101828" : "#fff",
    color: isDark ? "#fff" : "#000",
    confirmButtonColor: "#155dfc"
  });
};

export const showConfirmAlert = (
  message = "Are you sure?",
  html,
  confirmText = "Yes",
  cancelText = "Cancel"
) => {
  const isDark = document.documentElement.classList.contains("dark");

  return Swal.fire({
    title: message,
    html,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    background: isDark ? "#101828" : "#fff",
    color: isDark ? "#fff" : "#000",
    confirmButtonColor: "#e7000b",
    cancelButtonColor: "#155dfc"
  });
};