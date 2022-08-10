import { useId } from "react";
import "./Login.css";

const Login = () => {
  const formId = useId();

  return (
    <div className="login">
      <form id={formId} className="login-form">
        <p>this is form component</p>
      </form>

      <button type="submit" form={formId}>
        Sign In
      </button>
    </div>
  );
};

export default Login;
