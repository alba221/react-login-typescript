import { removeToken } from "../../features/userDataSlice";
import { useAppDispatch } from "../hooks/useRedux";
import { removeSessionToken } from "../store/sessionManager";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getUserData } from "../auth/userAuth";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userFirstNameLastName, setFirstNameLastName] = useState("");
  const effectRun = useRef(false);

  const handleLogoutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    removeSessionToken();
    dispatch(removeToken());

    navigate("/");
  };

  useEffect(() => {
    if (!effectRun.current) {
      const userDetails = async () => {
        const res = await getUserData();
        setFirstNameLastName(
          res.data.data.FirstName + " " + res.data.data.LastName
        );
      };
      userDetails();
    }

    return () => {
      effectRun.current = true;
    };
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h3 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Wellcome {userFirstNameLastName}
          </h3>
          <h4>You have successfully logged in!</h4>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogoutSubmit}>
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
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Logout;
