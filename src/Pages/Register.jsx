import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api"; 
import { ButtonPrimary } from "../Components/Buttons";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts";
import { z } from "zod";
import { useLoading } from "../Contexts/LoadingContext";
import { useAuth } from "../Contexts/AuthContext";

const Register = () => {
  const { showLoading, hideLoading } = useLoading();
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    isLoggedIn && navigate("/");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const errorMessages = validation.error.errors.map(err => err.message).join("<br />");
      showErrorAlert("Validation Error!", errorMessages);
      return;
    }

    showLoading();

    try {
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 201) {
        login(res.data.token);
        showSuccessAlert("User Registered Successfully!");
        navigate("/");
      }
    } catch (error) {
      showErrorAlert(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-3xl font-bold text-blue-600 uppercase mb-5">Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 max-w-[400px] border border-gray-100 dark:border-gray-700 w-full rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-2">Register</h2>
        <div>
          <label className="block dark:text-white mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition dark:text-white placeholder:text-gray-500 py-2 px-3 w-full"
          />
        </div>
        <div>
          <label className="block dark:text-white mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition dark:text-white placeholder:text-gray-500 py-2 px-3 w-full"
          />
        </div>
        <div>
          <label className="block dark:text-white mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition dark:text-white placeholder:text-gray-500 py-2 px-3 w-full"
          />
        </div>
        <div>
          <label className="block dark:text-white mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="border outline-0 rounded-xl border-gray-200 focus:border-blue-600 dark:border-gray-700 dark:focus:border-blue-600 transition dark:text-white placeholder:text-gray-500 py-2 px-3 w-full"
          />
        </div>
        <div>
          <ButtonPrimary className="w-full">
            Register
          </ButtonPrimary>
        </div>
      </form>

      <div className="flex gap-1 mt-5">
        <span className="dark:text-white">Already have an account?</span>
        <Link to="/login" className="text-blue-600 hover:text-blue-800 transition underline">Sign in</Link>
      </div>
    </div>
  );
};

export default Register;
