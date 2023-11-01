import { Link, Redirect, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";

export const EditItem = () => {
  //パスパラメータ取得
  const { item_id } = useParams<{
    item_id: string;
  }>();
  //現在ログインしているユーザー情報取得
  const userData = GetUserData();
  const updater = userData.user_name;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/${item_id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: title,
            updater: updater,
            description: description,
            url: url,
          }),
        }
      );
      if (!result.ok) {
        throw Error(`Failed to fetch item detail: ${result.status}`);
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
        <label>タイトル</label>
        <input
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>説明文</label>
        <input
          type={"text"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>URL</label>
        <input
          type={"text"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type={"submit"}>更新</button>
      </form>
    </div>
  );
};
