import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter, Route, Redirect, useHistory } from "react-router-dom";
import { SetUserData } from "./User";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [term, setTerm] = useState(0);

  const auth = getAuth();
  const history = useHistory();

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("登録ユーザー:" + user.email);
        //データベースにユーザー情報送る
        try {
          const result = await fetch(
            "https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/users",
            {
              method: "POST",
              body: JSON.stringify({
                user_name: userName,
                email: email,
                term: term,
              }),
            }
          );
          if (!result.ok) {
            throw Error(`Failed to create user: ${result.status}`);
          }
        } catch (err) {
          console.error(err);
        }
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
    <div>
      <h1>UTTC knowledge base アカウント作成</h1>
      <h3>アカウントをお持ちでない方</h3>
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
        <label>ユーザー名</label>
        <input
          type={"text"}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>期</label>
        <input
          type={"number"}
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
        />
        <button type={"submit"}>登録</button>
      </form>
    </div>
  );
};
