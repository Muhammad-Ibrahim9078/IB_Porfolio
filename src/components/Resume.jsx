import React from "react";
import Swal from "sweetalert2"; // SweetAlert2 ko import karen

function Resume() {
  // Ye function image ko modal mein show karne ke liye hai
  const handleClick = () => {
    Swal.fire({
      title: "", // Title ko empty chhod rahe hain
      html: `<img src="https://res.cloudinary.com/df92wfbox/image/upload/v1764776157/myImages/p3up5ikinlk1gdciffbb.jpg" style="width: 100%; height: auto;"/>`, // Image ko modal mein show karna
      width: '100%',
      heightAuto: true,
      showCloseButton: true, // Close button enable karna
      background: '#000000', // Background ko dark karna
      showConfirmButton: false, // Confirm button hide karna
      showCancelButton: false, // Cancel button hide karna
      customClass: {
        popup: 'custom-popup' // Custom class for styling if needed
      }
    });
  };

  return (
    <div>
      <a
        href="#!"
        onClick={handleClick} // Button click par handleClick function call hoga
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 w-[200px]"
      >
        View Resume
      </a>
    </div>
  );
}

export default Resume;
