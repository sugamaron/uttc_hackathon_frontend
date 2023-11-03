import { Link, Redirect, useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";

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
  const [category_id, setCategoryId] = useState("");
  const [lesson_id, setLessonId] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category_id == "notSelected") {
      alert("登録するアイテムのカテゴリを入力してください。");
    }

    if (lesson_id == "notSelected") {
      alert("登録するアイテムのカテゴリを入力してください。");
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
    } catch (err) {
      console.error(err);
    }
    history.push("/home");
  };

  useEffect(() => {
    fetchLessons();
    fetchCategories();
  }, []);

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

        <label>カリキュラムの章</label>
        <select
          name="lesson"
          value={lesson_id}
          onChange={(e) => setLessonId(e.target.value)}
        >
          <option value="notSelected">選択してください</option>
          {lessons.map((lesson, index) => (
            <option key={index} value={lesson.lesson_id}>
              {lesson.lesson_name}
            </option>
          ))}
        </select>

        <label>アイテムカテゴリ</label>
        <select
          name="category"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="notSelected">選択してください</option>
          {categories.map((category, index) => (
            <option key={index} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>

        <label>URL</label>
        <input
          type={"text"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label>説明文</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>価格(技術書の場合)</label>
        <input
          type={"number"}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <button type={"submit"}>アイテム登録</button>
      </form>
    </div>
  );
};
