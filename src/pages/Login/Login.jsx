/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import login from "../../assets/images/login/login.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        const loggedUser = {
          email: user.email,
        };
        console.log(loggedUser);
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("jwt respond", data);
            // Warning: Local storage is not the best(second best place) to store access token
            localStorage.setItem("car-access-token", data.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="my-2">
              New to Car Doctor ?
              <Link className="underline font-bold" to="/signup">
                {" "}
                <span className="text-[red]">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
