import { useParams } from "react-router-dom";
import { useState } from "react";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";
import { Header } from "./Header";
import "./style/ItemEdit.css";
import { MantineProvider } from "@mantine/core";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { Textarea } from "@mantine/core";

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
      alert("アイテムを更新しました。");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MantineProvider>
      <Header />
      <LessonList />
      <div className="ItemEdit">
        <h1>アイテム編集</h1>
        <form onSubmit={onsubmit}>
          <div className="EditForm">
            <div className="p-5">
              <label>タイトル</label>
              <Input
                className="w-1/2"
                placeholder="新しいタイトルを入力してください"
                type={"text"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label>説明文</label>
              <Textarea
                className="w-1/2"
                size="md"
                placeholder="新しい説明文を入力してください"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label>URL</label>
              <Input
                className="w-1/2"
                placeholder="新しいURLを入力してください"
                type={"text"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="EditButton"
            variant="default"
            color="rgba(209, 207, 207, 1)"
            type={"submit"}
          >
            更新
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
};
