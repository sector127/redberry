"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validatePassword = (password) => {
    return password.length >= 3;
  };

  const validateImageFile = (file) => {
    if (!file) return { isValid: true, error: "" };
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 1 * 1024 * 1024;
    
    if (!validTypes.includes(file.type)) {
      return { isValid: false, error: "Please select a valid image format (JPEG, PNG, GIF, or WebP)" };
    }
    
    if (file.size > maxSize) {
      return { isValid: false, error: "Image size must be less than 1MB" };
    }
    
    return { isValid: true, error: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const validation = validateImageFile(file);
      
      if (validation.isValid) {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
        }));
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarPreview(e.target.result);
        };
        reader.readAsDataURL(file);
        
        if (errors.avatar) {
          setErrors((prev) => ({
            ...prev,
            avatar: "",
          }));
        }
      } else if (response.status === 413) {
        setErrors((prev) => ({
          ...prev,
          form: "The uploaded file is too large. Please choose a smaller image (under 1MB).",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          avatar: validation.error,
        }));
        setAvatarPreview(null);
        setFormData((prev) => ({
          ...prev,
          avatar: null,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        avatar: null,
      }));
      setAvatarPreview(null);
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (!validateUsername(formData.username)) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 3 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.avatar) {
      const validation = validateImageFile(formData.avatar);
      if (!validation.isValid) {
        newErrors.avatar = validation.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setErrors({});

  if (!validateForm()) {
    setIsSubmitting(false);
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('password_confirmation', formData.confirmPassword);
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }

    const response = await fetch('https://api.redseam.redberryinternship.ge/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formDataToSend,
    });

    if (response.ok) {
      toast.success('Registration successful! Redirecting to login...', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push('/login');
      }, 3000); 
    } else {
      
      const errorData = await response.json();
      
      if (response.status === 422) {
        const apiErrors = errorData.errors || {};
        setErrors({
          username: apiErrors.username?.[0] || '',
          email: apiErrors.email?.[0] || '',
          password: apiErrors.password?.[0] || '',
          confirmPassword: apiErrors.password_confirmation?.[0] || '',
          avatar: apiErrors.avatar?.[0] || '',
        });
      } else if (response.status === 413) {
        setErrors({ form: 'The uploaded file is too large. Please choose a smaller image (under 1MB).' });
      } else {
        setErrors({ form: errorData.message || 'Registration failed. Please try again.' });
      }
    }
  } catch (error) {
    setErrors({ form: 'An error occurred. Please check your connection and try again.' });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="flex min-h-screen">
      <Image
        src="/assets/images/login-register.png"
        alt="Register Image"
        width={948}
        height={1000}
        className="object-cover"
      />
      <div className="flex flex-col justify-center px-8 lg:px-16 flex-1 max-w-md">
        <h1 className="text-5xl font-semibold text-black mb-6">Register</h1>

        <form className="space-y-6 w-[554px]" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <div className="relative">
              {!formData.username && focusedField !== "username" && (
                <label
                  htmlFor="username"
                  className="font-normal text-sm absolute left-4 top-1/2 transform -translate-y-1/2 flex text-black gap-2"
                >
                  Username
                  <span className="text-redberryRed pointer-events-none">*</span>
                </label>
              )}
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => handleFocus("username")}
                onBlur={handleBlur}
                className={`w-full px-3 py-3 border rounded-lg ${
                  errors.username ? "border-red-300" : "border-formGrey text-black"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <div className="relative">
              {!formData.email && focusedField !== "email" && (
                <label
                  htmlFor="email"
                  className="font-normal text-sm absolute left-4 top-1/2 transform -translate-y-1/2 flex text-black gap-2"
                >
                  Email
                  <span className="text-redberryRed pointer-events-none">*</span>
                </label>
              )}
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className={`w-full px-3 py-3 border rounded-lg ${
                  errors.email ? "border-red-300" : "border-formGrey text-black"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              {!formData.password && focusedField !== "password" && (
                <label
                  htmlFor="password"
                  className="font-normal text-sm absolute left-4 top-1/2 transform -translate-y-1/2 flex text-black gap-2"
                >
                  Password
                  <span className="text-redberryRed pointer-events-none">*</span>
                </label>
              )}
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                className={`w-full px-3 py-3 pr-12 border rounded-lg ${
                  errors.password ? "border-red-300" : "border-formGrey text-black"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="relative">
              {!formData.confirmPassword && focusedField !== "confirmPassword" && (
                <label
                  htmlFor="confirmPassword"
                  className="font-normal text-sm absolute left-4 top-1/2 transform -translate-y-1/2 flex text-black gap-2"
                >
                  Confirm Password
                  <span className="text-redberryRed pointer-events-none">*</span>
                </label>
              )}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={handleBlur}
                className={`w-full px-3 py-3 pr-12 border rounded-lg ${
                  errors.confirmPassword ? "border-red-300" : "border-formGrey text-black"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Avatar Field */}
          <div>
            <div className="space-y-2">
              <label
                htmlFor="avatar"
                className="font-normal text-sm text-black"
              >
                Avatar (optional)
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="avatar"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-formGrey rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Choose Image
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {avatarPreview && (
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAvatarPreview(null);
                        setFormData(prev => ({ ...prev, avatar: null }));
                      }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Supported formats: JPEG, PNG, GIF, WebP. Max size: 1MB
              </p>
              {errors.avatar && (
                <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
              )}
            </div>
          </div>

          {/* Enhanced error display */}
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span className="text-sm">{errors.form}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 border border-transparent text-sm font-medium rounded-[10px] text-white cursor-pointer ${
              isSubmitting
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-redberryRed hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            } transition duration-150 ease-in-out`}
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm font-normal text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-redberryRed hover:text-orange-700 transition duration-150 ease-in-out"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;