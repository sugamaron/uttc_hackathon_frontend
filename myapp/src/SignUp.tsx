import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { SetUserData } from "./User";
import { MantineProvider, Input } from "@mantine/core";
import "./style/SignUp.css";
import { Header } from "./Header";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [termStr, setTermStr] = useState("");

  const auth = getAuth();
  const history = useHistory();

  const SaveUserData = async () => {
    await SetUserData(email);
    history.push("/home");
  };

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //文字列型のtermStrをnumberに変換する
    const term = Number(termStr);
    if (Number.isNaN(term)) {
      alert("半角数字を入力してください。");
      return;
    }

    if (term > 4 || term < 0) {
      alert("0から4までの半角数字を入力してください。");
      return;
    }

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
        //sessionStorageにユーザー情報保存
        SaveUserData();
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
      <div className="SignUpForm">
        <h3>アカウントをお持ちでない方</h3>
        <form onSubmit={onsubmit}>
          <div className="p-5">
            <label>メールアドレス</label>
            <Input
              className="w-1/2"
              placeholder="メールアドレスを入力してください。"
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="p-5">
            <label>パスワード</label>
            <Input
              className="w-1/2"
              placeholder="パスワードを入力してください。"
              type={"text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p-5">
            <label>ユーザー名</label>
            <Input
              className="w-1/2"
              placeholder="ユーザー名を入力してください。"
              type={"text"}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="p-5">
            <label>期</label>
            <Input
              className="w-1/2"
              placeholder="期を入力してください。"
              type={"number"}
              value={termStr}
              onChange={(e) => setTermStr(e.target.value)}
            />
          </div>
          <button className="p-5" type={"submit"}>
            アカウント登録
          </button>
        </form>
      </div>
    </MantineProvider>
  );
};
