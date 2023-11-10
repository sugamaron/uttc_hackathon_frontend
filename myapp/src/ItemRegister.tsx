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
  const [category_id, setCategoryId] = useState<string | null>("");
  const [lesson_id, setLessonId] = useState<string | null>("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (priceStr == "" && category_id == "book") {
      alert("技術書の場合は価格も入力してください");
      return;
    }

    //文字列型のpriceStrをnumberに変換する
    const price = Number(priceStr);
    if (Number.isNaN(price)) {
      alert("半角数字を入力してください。");
      return;
    }

    if (price != 0 && category_id != "book") {
      alert("技術ブログ、技術動画の場合は価格には何も入力しないでください");
      return;
    }

    if (lesson_id === null) {
      alert("登録するアイテムの章を入力してください。");
      return;
    }

    if (category_id === null) {
      alert("登録するアイテムのカテゴリを入力してください。");
      return;
    }

    if (url == "") {
      alert("URLを入力してください");
      return;
    }

    if (title == "") {
      alert("タイトルを入力してください");
      return;
    }

    if (category_id != "book" && price != 0) {
      alert("価格には何も入力しないでください");
      return;
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
            image_url: imageUrl,
          }),
        }
      );
      if (!result.ok) {
        throw Error(`Failed to register item: ${result.status}`);
      }
    } catch (err) {
      console.error(err);
      alert("アイテム登録に失敗しました");
      return;
    }
    //登録されたあとの処理
    //slackに通知
    const payload = {
      text: `${title}が登録されました`,
    };
    const slackWebhookURL =
      "https://hooks.slack.com/services/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";

    fetch(slackWebhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Slackへのメッセージの送信に失敗しました");
        }
        console.log("Slackに通知が送られました");
      })
      .catch((error) => {
        console.error("Slackへのメッセージの送信に失敗しました", error);
      });

    alert("アイテムを登録しました。");
    history.push("/home");
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
                placeholder="タイトルを入力してください"
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
              <label>画像のURL</label>
              <Input
                className="w-1/2"
                placeholder="画像のURLを入力してください(無い場合は何も入力しないでください)"
                type={"text"}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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
                value={priceStr}
                onChange={(e) => setPriceStr(e.target.value)}
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
