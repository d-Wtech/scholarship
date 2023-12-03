import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  sendSuccessMessage,
  sendInfoMessage,
  sendErrorMessage,
} from "../utils/notifier.js";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    paymentError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate each field
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    });

    //validate mobile number
    if (formData.mobileNumber.length !== 10) {
      newErrors.password = "Mobile number should be of 10 digit";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    // Validate password length
    if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    // Validate password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePayment = async () => {
    try {
      // Simulate a payment API call
      const response = await fetch("your_payment_api_endpoint", {
        method: "POST",
        body: JSON.stringify({
          // Include payment details here
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      // Payment successful, proceed with registration
      return true;
    } catch (error) {
      setErrors({ ...errors, paymentError: "Payment failed" });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        // registering the user
        const data = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          password: formData.password,
        };

        const res = await axios.post("/api/user-signup", data);
        if (res.data.success) {
          sendSuccessMessage(res.data.message);
          sendInfoMessage("Now you can login");
          navigate("/login");
        } else {
          sendErrorMessage(res.data.error);
        }
      } else {
        throw new Error("Invalid details entered");
      }
    } catch (error) {
      sendErrorMessage("Form Validation failed");
    }
  };

  return (
    <form className="flex flex-col gap-2 p-1.5" onSubmit={handleSubmit}>
      <label htmlFor="firstName">
        First Name: <span className="text-red-500">*</span>{" "}
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          autoComplete="off"
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.firstName}</div>
      </label>
      <label htmlFor="lastName">
        Last Name: <span className="text-red-500">*</span>{" "}
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="off"
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.lastName}</div>
      </label>
      <label htmlFor="email">
        Email id: <span className="text-red-500">*</span>{" "}
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.email}</div>
      </label>
      <label htmlFor="mobileNumber">
        Mobile Number: <span className="text-red-500">*</span>{" "}
        <input
          type="number"
          name="mobileNumber"
          id="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          autoComplete="off"
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.mobileNumber}</div>
      </label>
      <label htmlFor="password">
        Password: <span className="text-red-500">*</span>{" "}
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.password}</div>
      </label>
      <label htmlFor="confirmPassword">
        Confirm Password: <span className="text-red-500">*</span>{" "}
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="off"
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.confirmPassword}</div>
      </label>
      <div className="text-red-500">{errors.paymentError}</div>
      <button
        type="submit"
        className="bg-blue-500 m-auto p-2 text-xl text-white rounded-xl"
      >
        Register with Payment
      </button>
    </form>
  );
};

export default Register;
