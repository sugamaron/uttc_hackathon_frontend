import { Link, Redirect, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";
import { Header } from "./Header";
import { MantineProvider } from "@mantine/core";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import "./style/ProfileEdit.css";

export const EditProfile = () => {
  //パスパラメータ取得
  const { user_id } = useParams<{
    user_id: string;
  }>();

  const [user_name, setUserName] = useState("");
  const [termStr, setTermStr] = useState("");

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    return <Redirect to="/home" />;
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
            className="RegisterButton"
            variant="default"
            color="rgba(209, 207, 207, 1)"
            size="md"
            type={"submit"}
          >
            更新
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
};
