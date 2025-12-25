import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./common/Layout";
import { apiUrl } from "./common/http";
import { AuthContext } from "./context/Auth";

const Login = () => {
    useEffect(() => {
      document.title = "User Login - FK BAZAR"; // dynamic title
    }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          const userInfo = {
            token: result.token,
            id: result.id,
            name: result.name,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          login(userInfo);
          navigate("/account");
        } else {
          toast.error(result.message);
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
                  <h3 className="text-center mb-4">Login</h3>

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

                  {/* Button */}
                  <button type="submit" className="btn btn-secondary w-100">
                    Login
                  </button>

                  {/* Register Link */}
                  <div className="text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <Link to="/account/register">Register</Link>
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

export default Login;
