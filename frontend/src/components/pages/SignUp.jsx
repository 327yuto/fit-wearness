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
  // const confirmSuccessUrl = "http://localhost:3002";
  const confirmSuccessUrl = "https://fit-wearness-front.herokuapp.com"

  // const generateParams = () => {
  //   const signUpParams = {
  //     email: email,
  //     password: password,
  //     passwordConfirmation: passwordConfirmation,
  //     category: category,
  //     confirmSuccessUrl: confirmSuccessUrl,
  //   };
  //   return signUpParams;
  // };

  const signUpHandleSubmit = async (e) => {
    e.preventDefault();

    const params = generateParams();
    console.log(e);

    try {
      const res = await signUp(params);
      console.log(res);
      alert("confirm email");
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
//   return (
//     <>
//       <h1>サインアップページです</h1>
//       <form>
//         <div>
//           <label htmlFor="email">メールアドレス</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">パスワード</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password_confirmation">パスワード確認</label>
//           <input
//             type="password"
//             id="password_confirmation"
//             name="password_confirmation"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="category">Fitnessカテゴリー</label>
//           <input
//             type="category"
//             id="category"
//             name="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </div>
//         <div>
//           <input
//             type="hidden"
//             id="confirm_success_url"
//             name="confirm_success_url"
//             value={confirmSuccessUrl}
//           />
//         </div>
//         <button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
//           Submit
//         </button>
//       </form>
//       <Link to="/signin">サインインへ</Link>
//     </>
//   );
// };
