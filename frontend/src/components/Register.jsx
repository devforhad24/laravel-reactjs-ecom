import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./common/Layout";
import { apiUrl } from "./common/http";

const Register = () => {
    useEffect(() => {
      document.title = "User Register - FK BAZAR"; // dynamic title
    }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/account/login");
        } else {
          //   toast.error(result.message);
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field[0]] });
          });
        }
      });
  };

  return (
    <Layout>
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card shadow border-0">
                <div className="card-body p-4 p-md-5">
                  <h3 className="text-center mb-4">Register</h3>

                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      {...register("name", {
                        required: "The name field is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      {...register("email", {
                        required: "The email field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your Email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      {...register("password", {
                        required: "The password field is required.",
                      })}
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your Password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-secondary w-100">
                    Register
                  </button>

                  {/* Login Link */}
                  <div className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/account/login">Login</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Register;
