import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("ログイン:" + user.email);
        return (
          <BrowserRouter>
            <Redirect to="/lessons" />
          </BrowserRouter>
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ":" + errorMessage);
      });
  };

  return (
    <div>
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
