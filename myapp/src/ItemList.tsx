import {
  BrowserRouter,
  Route,
  Redirect,
  Link,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

type Category = {
  category_id: string;
  category_name: string;
};
type Item = {
  item_id: string;
  title: string;
  Registrant: string;
  RegistrationDate: string;
  updateDate: string;
  likes: number;
};

export const ItemList = () => {
  //パスパラメータlesson_id, category_id, order取得
  const { lesson_id, category_id, order } = useParams<{
    lesson_id: string;
    category_id: string;
    order: string;
  }>();
  //クエリパラメータlesson_name取得
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const lesson_name = query.get("lesson_name");

  //アイテムカテゴリ一覧取得
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

  //章、カテゴリ別のアイテム一覧取得
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items?lesson_id=${lesson_id}&category_id=${category_id}&order=${order}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch items: ${res.status}`);
      }

      const items: Item[] = await res.json();
      setItems(items);
      console.log(items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  return (
    <div>
      <h2>{lesson_name}</h2>
      {categories.map((category, index) => (
        <div key={index}>
          <Link
            to={`/items/${lesson_id}/${category.category_id}/registration_order?lesson_name=${lesson_name}`}
          >
            {category.category_name}
          </Link>
        </div>
      ))}
      <p></p>

      <Link
        to={`/items/${lesson_id}/${category_id}/registration_order?lesson_name=${lesson_name}`}
      >
        登録日順
      </Link>
      <Link
        to={`/items/${lesson_id}/${category_id}/update_order?lesson_name=${lesson_name}`}
      >
        更新日順
      </Link>
      <Link
        to={`/items/${lesson_id}/${category_id}/like_order?lesson_name=${lesson_name}`}
      >
        いいね順
      </Link>
      <p></p>

      {items.map((item, index) => (
        <div key={index}>
          <Link to={`/items/${item.item_id}`}>{item.title}</Link>
          <ul>
            <li>{item.Registrant}</li>
            <li>{item.RegistrationDate}</li>
            <li>{item.updateDate}</li>
            <li>{item.likes}</li>
          </ul>
          <br />
        </div>
      ))}
    </div>
  );
};
