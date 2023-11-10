import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { SetUserData } from "./User";
import { MantineProvider, Input } from "@mantine/core";
import "./style/SignUp.css";
import { Header } from "./Header";
import { PasswordInput } from "@mantine/core";
import { Select } from "@mantine/core";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [termStr, setTermStr] = useState<string | null>("");

  const auth = getAuth();
  const history = useHistory();

  const SaveUserData = async () => {
    await SetUserData(email);
    history.push("/home");
  };

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (termStr === "") {
      alert("期を選択してください");
      return;
    }

    //文字列型のtermStrをnumberに変換する
    const term = Number(termStr);
    // if (Number.isNaN(term)) {
    //   alert("期の欄には半角数字を入力してください。");
    //   return;
    // }

    // if (term > 4 || term < 0) {
    //   alert("0から4までの半角数字を入力してください。");
    //   return;
    // }

    if (userName == "") {
      alert("ユーザー名を入力してください");
      return;
    }

    if (password == "") {
      alert("パスワードを入力してください");
      return;
    }

    if (email == "") {
      alert("メールアドレスを入力してください");
      return;
    }

    if (password != confirmPassword) {
      alert("パスワードが一致しません");
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
          alert("アカウント登録に失敗しました");
          return;
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
            <PasswordInput
              className="w-1/2"
              placeholder="パスワードを入力してください。"
              // visible={visible}
              // onVisibilityChange={toggle}
              type={"text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p-5">
            <label>パスワード(確認用)</label>
            <PasswordInput
              className="w-1/2"
              placeholder="パスワードを入力してください。"
              // visible={visible}
              // onVisibilityChange={toggle}
              type={"text"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {/* <Input
              className="w-1/2"
              placeholder="期を入力してください。"
              type={"number"}
              value={termStr}
              onChange={(e) => setTermStr(e.target.value)}
            /> */}
            <Select
              className="w-1/2"
              name="term"
              placeholder="アイテムカテゴリを選択してください"
              value={termStr}
              data={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
              ]}
              onChange={setTermStr}
            ></Select>
          </div>
          <button className="p-5" type={"submit"}>
            アカウント登録
          </button>
        </form>
      </div>
    </MantineProvider>
  );
};
