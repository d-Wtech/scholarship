import LoginForm from "../Components/LoginForm";
import AuthWrapper from "../Components/AuthWrapper";

const Login = () => {
  return (
    <>
      <AuthWrapper
        jsxElement={<LoginForm />}
        endPoint={"/signup"}
        showLogin={true}
      />
    </>
  );
};

export default Login;
