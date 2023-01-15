import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../api/auth";
import { AuthContext } from "../../App";

import SignForm from './SignForm';

export const SignUp = () => {


  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [category, setCategory] = useState("");
  const confirmSuccessUrl = process.env.REACT_APP_CONFIRM_SUCCESS_URL;


  const signUpHandleSubmit = async (e) => {
    e.preventDefault();

    const params = generateParams();
    console.log(e);

    try {

      const res = await signUp(params);
      alert("メールを送信しました。メールを開いて登録を完了させて下さい。");

    } catch (e) {
      console.log(e);
    }
  };

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      category: category,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  return (
    <SignForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      passwordConfirmation={passwordConfirmation}
      setPasswordConfirmation={setPasswordConfirmation}
      category={category}
      setCategory={setCategory}
      handleSubmit={signUpHandleSubmit}
      signType='signUp'
    />
  );
};
