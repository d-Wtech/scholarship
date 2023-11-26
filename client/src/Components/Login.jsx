import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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

    // Validate password length
    if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Your login logic here
      console.log("Login submitted:", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <form className="flex flex-col gap-3 p-2" onSubmit={handleSubmit}>
      <label htmlFor="">
        Email id: <span className="text-red-500">*</span>{" "}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.email}</div>
      </label>
      <label htmlFor="">
        Password: <span className="text-red-500">*</span>{" "}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-black w-full p-1.5 rounded-lg hover:shadow-lg"
          required
        />
        <div className="text-red-500">{errors.password}</div>
      </label>
      <div className="text-center mt-3">
        <button
          type="submit"
          className="bg-blue-500 m-auto p-2 text-xl text-white rounded-xl"
        >
          <Link to={"/test-dashboard"}>Login</Link>
        </button>
      </div>
    </form>
  );
};

export default Login;
