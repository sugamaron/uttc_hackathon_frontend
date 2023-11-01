import { Link, Redirect, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";

export const EditProfile = () => {
  //パスパラメータ取得
  const { user_id } = useParams<{
    user_id: string;
  }>();
  //現在ログインしているユーザー情報を取得
  const userProfile = GetUserData();

  const [user_name, setUserName] = useState("");
  const [term, setTerm] = useState(0);

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    <div>
      <LessonList />

      <form onSubmit={onsubmit}>
        <label>ユーザー名</label>
        <input
          type={"text"}
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>term</label>
        <input
          type={"number"}
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
        />
        <button type={"submit"}>更新</button>
      </form>
    </div>
  );
};
