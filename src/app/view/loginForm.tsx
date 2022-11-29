import React from "react";
import { authUser } from "../auth/userAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeToken } from "../../features/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { saveToken, getToken } from "../store/sessionManager";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.userData.token);

  useEffect(() => {
    if (token === null) {
      const storedToken = getToken();
      if (storedToken !== null) {
        dispatch(storeToken(storedToken));
        navigate("/wellcome");
      }
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showErrorToast = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const loginHealthCheck = await authHealthCheck()
      // console.log('data', loginHealthCheck.data)

      const response = await authUser(email, password);
      console.log("response: ", response);
      if (response && response.data?.status === true) {
        dispatch(storeToken(response.data.data));
        saveToken(response.data.data);
        navigate("/wellcome");
        showSuccessToast("Login successful!");
      } else if (response && response.status === false) {
        showErrorToast("Login failed. Please check you email and password!");
      } else {
        showErrorToast("Login failed!");
      }
    } catch (err) {
      showErrorToast("Login failed!");
    }
  };

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
