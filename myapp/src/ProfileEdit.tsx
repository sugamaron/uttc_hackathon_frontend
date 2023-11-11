import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { LessonList } from "./LessonList";
import { Header } from "./Header";
import { MantineProvider } from "@mantine/core";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import "./style/ProfileEdit.css";
import { getAuth, updatePassword, deleteUser } from "firebase/auth";
import { PasswordInput, Select } from "@mantine/core";
import { SetUserData } from "./User";
import { GetUserData } from "./User";

export const EditProfile = () => {
  const history = useHistory();
  //パスパラメータ取得
  const { user_id } = useParams<{
    user_id: string;
  }>();

  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [termStr, setTermStr] = useState<string | null>("");

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isConfirmed = window.confirm("更新しますか？");

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

    if (isConfirmed) {
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
      const userEmail = GetUserData().email;
      SetUserData(userEmail);
      // history.push("/home");
    } else {
      return;
    }
  };

  //アカウント削除ボタン
  const DeleteUser = async () => {
    const isConfirmed = window.confirm("本当に削除しますか？");

    if (isConfirmed) {
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
    } else {
      return;
    }
  };

  return (
    <MantineProvider>
      <Header />
      <LessonList />
      <div className="ProfileEdit">
        <h1>プロフィール編集</h1>
        <h2 className="mt-3">未入力の欄は更新されません。</h2>
        <form onSubmit={onsubmit}>
          <div className="ProfileForm">
            <div className="p-5">
              <Input.Label>ユーザー名</Input.Label>
              <Input
                className="w-1/2"
                placeholder="新しいユーザー名を入力してください"
                type={"text"}
                value={user_name}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="p-5">
              <Input.Label>パスワード</Input.Label>
              <PasswordInput
                className="w-1/2"
                placeholder="新しいパスワードを入力してください"
                type={"text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="p-5">
              <Input.Label required>期</Input.Label>
              <Select
                className="w-1/2"
                name="term"
                placeholder="期を選択してください"
                value={termStr}
                data={[
                  { value: "0", label: "0" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                ]}
                onChange={setTermStr}
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
