import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Phone, ArrowRight, Store } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { UserRole } from "../../features/user/types";
import PhoneInputField from "../../components/UiComponents/PhoneInput";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupRequest } from "../../features/auth/slice";
import { ToastContainer } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const dispatch = useDispatch();

  const validate = (value: string) => {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = "Invalid email address";
    }
    return errorMessage;
  };

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name is required"),
    last_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should be atleast 6 alphabet"),
    role: Yup.string().oneOf(Object.values(UserRole)).required(),
  });

  const handleSubmit = async (values: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    role: UserRole;
  }) => {
    await dispatch(signupRequest(values));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <span className="text-4xl font-bold text-green-500">blink</span>
          <span className="text-4xl font-bold text-gray-700">it</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setRole(UserRole.BUYER)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  role === "buyer"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-green-200"
                }`}
              >
                <User className="mx-auto mb-1" size={24} />
                <span className="text-sm font-medium">Buyer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.SELLER)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  role === "seller"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-green-200"
                }`}
              >
                <Store className="mx-auto mb-1" size={24} />
                <span className="text-sm font-medium">Seller</span>
              </button>
            </div>
          </div>

          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              first_name: "",
              last_name: "",
              phone_number: "",
              email: "",
              password: "",
              role: role,
            }}
            validationSchema={SignupSchema}
          >
            {({ getFieldProps, values }) => (
              <Form className="gap-2 flex flex-col">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <Field
                      {...getFieldProps("first_name")}
                      type="text"
                      id="first_name"
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your first name"
                    />
                    <User
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                  <ErrorMessage name="first_name">
                    {(msg) => (
                      <div className=" text-sm text-red-500">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <Field
                      {...getFieldProps("last_name")}
                      type="text"
                      id="last_name"
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your last name"
                    />
                    <User
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                  <ErrorMessage name="last_name">
                    {(msg) => (
                      <div className=" text-sm text-red-500">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <label
                    htmlFor="Role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role
                  </label>
                  <div className="relative">
                    <Field
                      {...getFieldProps("role")}
                      type="text"
                      id="role"
                      className="w-full capitalize bg-gray-200 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter role"
                      value={role}
                      disabled
                    />
                    <User
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                  <ErrorMessage name="role">
                    {(msg) => (
                      <div className=" text-sm text-red-500">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="">
                    <PhoneInputField
                      {...getFieldProps("phone_number")}
                      onChange={(e: any) => console.log(e.target.value)}
                      id="phone_number"
                      name="phone_number"
                      value={values.phone_number}
                      international
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <ErrorMessage name="phone_number">
                    {(msg) => (
                      <div className=" text-sm text-red-500">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Field
                      {...getFieldProps("email")}
                      id="email"
                      validate={validate}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your email"
                    />
                    <Mail
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className=" text-sm text-red-500">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      {...getFieldProps("password")}
                      id="password"
                      type="password"
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Create a password"
                    />
                    <Lock
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className=" text-sm text-red-500">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-green-600 hover:text-green-500">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:text-green-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Create Account</span>
                  <ArrowRight size={20} />
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
