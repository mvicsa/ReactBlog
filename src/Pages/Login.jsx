import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { ButtonPrimary } from "../Components/Buttons";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts";
import { z } from "zod";
import { useLoading } from "../Contexts/LoadingContext";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const { showLoading, hideLoading } = useLoading();
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginSchema = z.object({
    email: z.string().email("Invalid email address")
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const errorMessages = validation.error.errors.map(err => err.message).join("<br />");
      showErrorAlert("Validation Error!", errorMessages);
      return;
    }

    showLoading();

    try {
      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 200) {
        login(res.data.token);
        showSuccessAlert("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      showErrorAlert(error.response?.data?.message || "Login failed");
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
        <h2 className="text-2xl font-bold mb-2">Login</h2>
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
          <ButtonPrimary className="w-full">Login</ButtonPrimary>
        </div>
      </form>

      <div className="flex gap-1 mt-5">
        <span className="dark:text-white">Don't have an account?</span>
        <Link to="/register" className="text-blue-600 hover:text-blue-800 transition underline">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
