import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";
import { Header } from "./Header";
import "./style/ItemEdit.css";
import { MantineProvider } from "@mantine/core";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { Select } from "@mantine/core";

export const EditItem = () => {
  //パスパラメータ取得
  const { item_id } = useParams<{
    item_id: string;
  }>();

  //章一覧取得
  type Lesson = {
    lesson_id: string;
    lesson_name: string;
  };
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const fetchLessons = async () => {
    try {
      const res = await fetch(
        "https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/lessons",
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch lessons: ${res.status}`);
      }

      const lessons: Lesson[] = await res.json();
      setLessons(lessons);
    } catch (err) {
      console.error(err);
    }
  };

  //アイテムカテゴリ一覧取得
  type Category = {
    category_id: string;
    category_name: string;
  };
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/categories",
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch categories: ${res.status}`);
      }
      const categories: Category[] = await res.json();
      setCategories(categories);
    } catch (err) {
      console.error(err);
    }
  };

  //現在ログインしているユーザー情報取得
  const userData = GetUserData();
  const updater = userData.user_name;

  const [title, setTitle] = useState("");
  const [category_id, setCategoryId] = useState<string | null>("");
  const [lesson_id, setLessonId] = useState<string | null>("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (lesson_id === null) {
      alert("登録するアイテムの章を入力してください。");
      return;
    }

    if (category_id === null) {
      alert("登録するアイテムのカテゴリを入力してください。");
      return;
    }

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
            image_url: imageUrl,
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

  useEffect(() => {
    fetchLessons();
    fetchCategories();
  }, []);

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
              <label>カリキュラムの章</label>
              <Select
                className="w-1/2"
                name="lesson"
                placeholder="新しいカリキュラムの章を選択してください"
                value={lesson_id}
                data={lessons.map((lesson) => ({
                  value: lesson.lesson_id,
                  label: lesson.lesson_name,
                }))}
                onChange={setLessonId}
              ></Select>
            </div>
            <div className="p-5">
              <label>アイテムカテゴリ</label>
              <Select
                className="w-1/2"
                name="category"
                placeholder="新しいアイテムカテゴリを選択してください"
                value={category_id}
                data={categories.map((category) => ({
                  value: category.category_id,
                  label: category.category_name,
                }))}
                onChange={setCategoryId}
              ></Select>
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
            <div className="p-5">
              <label>画像URL</label>
              <Input
                className="w-1/2"
                placeholder="新しい画像URLを入力してください"
                type={"text"}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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
