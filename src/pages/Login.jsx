import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GlobalContext } from "../contexts";
import { setAdminLogin } from "../contexts/actions";
import { isAuthenticated } from "../helpers/token";
import logo from "../images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const [, dispatch] = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [navigate, auth]);

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      if (emailRef.current.value && passwordRef.current.value) {
        await setAdminLogin(dispatch, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={logo} alt="logo" className="h-10 w-10 mb-5" />
      <div className="p-3 flex flex-col items-center w-full md:w-1/2 lg:w-1/3 rounded-lg border-2">
        <h1 className="text-4xl font-semibold my-5">Admin Login</h1>
        <div className="p-2 w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 flex flex-col items-start justify-start">
              <label htmlFor="email" className="text-xl font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                autoCapitalize="off"
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                required
              />
            </div>
            <div className="mb-5 flex flex-col items-start justify-start">
              <label htmlFor="password" className="text-xl font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                autoComplete="off"
                autoCapitalize="off"
                className="p-2 text-lg w-full h-10 rounded-md border-2 outline-none"
                minLength={6}
                required
              />
            </div>
            <div className="mb-5 flex items-start justify-start">
              <button
                type="submit"
                className="bg-background font-medium text-xl text-white px-5 py-2 rounded-md"
              >
                Login
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <div className="mb-5 flex items-start justify-start">
            <p>
              Want to maintain this site ?{" "}
              <Link to="/" className="text-blue-500">
                become an admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
