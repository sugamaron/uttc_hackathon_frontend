import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";
import "./style/ItemRegister.css";
import { MantineProvider } from "@mantine/core";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { Select } from "@mantine/core";
import { Header } from "./Header";

export const RegisterItem = () => {
  const history = useHistory();

  //パスパラメータ取得
  const { item_id } = useParams<{
    item_id: string;
  }>();

  //章一覧取得
  type Lesson = {
    lesson_id: string;
    lesson_name: string;
  };
  //selectタグで指定するための型
  type LessonForSelect = {
    value: string;
    label: string;
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
  const registrant = userData.user_name;
  const updater = userData.user_name;

  const [title, setTitle] = useState("");
  const [category_id, setCategoryId] = useState<string | null>("");
  const [lesson_id, setLessonId] = useState<string | null>("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);

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

    if (category_id == "book" && price != 0) {
      alert("priceには何も入力しないでください");
    }

    try {
      const result = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items`,
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            category_id: category_id,
            lesson_id: lesson_id,
            registrant: registrant,
            updater: updater,
            description: description,
            url: url,
            price: price,
          }),
        }
      );
      if (!result.ok) {
        throw Error(`Failed to register item detail: ${result.status}`);
      }
      alert("アイテムを登録しました。");
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

      <div className="ItemRegister">
        <h1>アイテム登録</h1>
        <form onSubmit={onsubmit}>
          <div className="RegsiterForm">
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
                placeholder="カリキュラムの章を選択してください"
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
                placeholder="アイテムカテゴリを選択してください"
                value={category_id}
                data={categories.map((category) => ({
                  value: category.category_id,
                  label: category.category_name,
                }))}
                onChange={setCategoryId}
              ></Select>
            </div>
            <div className="p-5">
              <label>URL</label>
              <Input
                className="w-1/2"
                placeholder="URLを入力してください"
                type={"text"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label>説明文</label>
              <Textarea
                className="w-1/2"
                size="md"
                placeholder="説明文を入力してください"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label>価格(技術書の場合)</label>
              <Input
                className="w-1/2"
                placeholder="価格を入力してください(技術書の場合のみ)"
                type={"number"}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>

          <Button
            className="RegisterButton"
            variant="default"
            color="rgba(209, 207, 207, 1)"
            type={"submit"}
            size="md"
          >
            登録
          </Button>
        </form>
      </div>
    </MantineProvider>
  );
};
