import {
  BrowserRouter,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useState } from "react";
import { GetUserData, SetUserData } from "./User";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const history = useHistory();

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("ログイン:" + user.email);
        SetUserData(email);
        console.log(GetUserData().email);
        history.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ":" + errorMessage);
      });
  };

  return (
    <div>
      <h1>UTTC knowledge base ログイン画面</h1>
      <h3>アカウントをお持ちの方</h3>
      <form onSubmit={onsubmit}>
        <label>メールアドレス</label>
        <input
          type={"text"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>パスワード</label>
        <input
          type={"text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};
