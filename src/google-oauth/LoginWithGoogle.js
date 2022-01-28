import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
const LoginWithGoogle = () => {
  let navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response.accessToken);
    localStorage.setItem("token", JSON.stringify(response.accessToken));
    navigate("/crud");
  };
  return (
    <div>
      <GoogleLogin
        clientId="710648431311-nhvilu6v1j27n6mak4qjqvvfebj490bn.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginWithGoogle;
