import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { LessonList } from "./LessonList";
import { Header } from "./Header";
import { MantineProvider } from "@mantine/core";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import "./style/ProfileEdit.css";
import { getAuth, updatePassword, deleteUser } from "firebase/auth";

export const EditProfile = () => {
  const history = useHistory();
  //パスパラメータ取得
  const { user_id } = useParams<{
    user_id: string;
  }>();

  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [termStr, setTermStr] = useState("");

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //文字列型のtermStrをnumberに変換する
    if (termStr == "") {
      alert("期の欄に半角数字を入力してください。");
      return;
    }
    const term = Number(termStr);
    if (Number.isNaN(term)) {
      alert("期の欄に半角数字を入力してください。");
      return;
    }

    if (term > 4 || term < 0) {
      alert("0から4までの半角数字を入力してください。");
      return;
    }

    if (password != "") {
      //パスワード変更
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        return;
      }
      updatePassword(user, password)
        .then(() => {
          alert("パスワードを変更しました");
        })
        .catch((error) => {
          console.error(error);
          alert("パスワード変更に失敗しました");
        });
    }
    try {
      const result = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/users/${user_id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            user_name: user_name,
            term: term,
          }),
        }
      );
      if (!result.ok) {
        throw Error(`Failed to fetch update profile: ${result.status}`);
      }
    } catch (err) {
      console.error(err);
    }
    alert("プロフィールを変更しました");
  };

  //アカウント削除ボタン
  const DeleteUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return;
    }
    deleteUser(user)
      .then(() => {
        console.log("firebaseからユーザー削除");
      })
      .catch((err) => {
        console.error(err);
        alert("アカウントの削除に失敗しました");
        return;
      });

    try {
      const result = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/users/${user_id}`,
        { method: "DELETE" }
      );
      if (!result.ok) {
        throw Error(`Failed to delete user: ${result.status}`);
      }
      alert("アカウントを削除しました。");
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MantineProvider>
      <Header />
      <LessonList />
      <div className="ProfileEdit">
        <h1>プロフィール編集</h1>
        <form onSubmit={onsubmit}>
          <div className="ProfileForm">
            <div className="p-5">
              <label>ユーザー名</label>
              <Input
                className="w-1/2"
                placeholder="新しいユーザー名を入力してください"
                type={"text"}
                value={user_name}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label>パスワード</label>
              <Input
                className="w-1/2"
                placeholder="新しいパスワードを入力してください"
                type={"text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label>期</label>
              <Input
                className="w-1/2"
                placeholder="新しい期を入力してください"
                type={"number"}
                value={termStr}
                onChange={(e) => setTermStr(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="ProfileButton"
            variant="default"
            color="rgba(209, 207, 207, 1)"
            size="md"
            type={"submit"}
          >
            更新
          </Button>
        </form>
        <div>
          <Button
            className="DeleteUserButton"
            variant="default"
            color="rgba(209, 207, 207, 1)"
            size="md"
            onClick={DeleteUser}
          >
            <p className="text-red-600">このアカウントを削除</p>
          </Button>
        </div>
      </div>
    </MantineProvider>
  );
};
