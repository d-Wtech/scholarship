import RegisterFrom from "../Components/RegisterForm";
import AuthWrapper from "../Components/AuthWrapper";

const Signup = () => {
  return (
    <>
      <AuthWrapper
        jsxElement={<RegisterFrom />}
        endPoint={"/login"}
        showLogin={false}
      />
    </>
  );
};

export default Signup;
