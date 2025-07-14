import { useEffect } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";

function LoginWithGoogle() {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "1057579119546-hm1a1a24hjmh2mnh1cffkn8o9lrlag3u.apps.googleusercontent.com",
      callback: (res) => {
        let res2 = jwtDecode(res.credential);
        console.log(res2);
      },
    });
    window.google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      {
        theme: "outline",
        size: "large",
        width: 200,
      }
    );
  }, []);

  return (
    <>
      <div>
        <div id="google-login-button"></div>
      </div>
    </>
  );
}

export default LoginWithGoogle;
