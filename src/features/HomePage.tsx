import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../app/view/loginForm";
import Wellcome from "../app/view/wellcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/wellcome" element={<Wellcome />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default Login;
