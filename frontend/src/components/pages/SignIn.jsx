import Cookies from "js-cookie";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCurrentUser, signIn } from "../../api/auth";
import { AuthContext } from "../../App";

import SignForm from './SignForm';

export const SignIn = () => {

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signInHandleSubmit = async (e) => {
    e.preventDefault();

    const params = generateParams();

    try {
      const res = await signIn(params);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        const sessions = await getCurrentUser();

        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };


  return (
    <SignForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={signInHandleSubmit}
      signType='signIn'
    />
  );
};
