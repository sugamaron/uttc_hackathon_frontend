import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { GetUserData, SetUserData } from "./User";
import { Header } from "./Header";
import { MantineProvider, createTheme } from "@mantine/core";
import "./style/LoginForm.css";
import { Input } from "@mantine/core";

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
        history.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ":" + errorMessage);
      });
  };

  return (
    <MantineProvider>
      <Header />
      <div className="LoginForm">
        <h1>アカウントをお持ちの方</h1>
        <form onSubmit={onsubmit}>
          <div className="p-5">
            <label>メールアドレス</label>
            <Input
              className="w-3/5"
              placeholder="メールアドレスを入力してください。"
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="p-5">
            <label>パスワード</label>
            <Input
              className="w-3/5"
              placeholder="パスワードを入力してください。"
              type={"text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="p-5">ログイン</button>
        </form>
      </div>
    </MantineProvider>
  );
};
