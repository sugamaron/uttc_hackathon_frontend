import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import "./style/ItemList.css";
import { Header } from "./Header";

type Category = {
  category_id: string;
  category_name: string;
};
type Item = {
  item_id: string;
  title: string;
  registrant: string;
  registration_date: string;
  update_date: string;
  likes: number;
  image_url: string;
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, [lesson_id, category_id, order]);

  return (
    <div>
      <Header />
      <LessonList />

      <div className="ItemList">
        <h2>{lesson_name}</h2>
        <div className="Categories">
          {categories.map((category, index) => (
            <div key={index}>
              <NavLink
                activeClassName="SelectedCategory"
                to={`/items/${lesson_id}/${category.category_id}/${order}?lesson_name=${lesson_name}`}
              >
                {category.category_name}
              </NavLink>
            </div>
          ))}
        </div>

        <div className="Order">
          <NavLink
            activeClassName="SelectedOrder"
            className="p-2"
            to={`/items/${lesson_id}/${category_id}/registration?lesson_name=${lesson_name}`}
          >
            登録日順
          </NavLink>
          <NavLink
            activeClassName="SelectedOrder"
            className="p-2"
            to={`/items/${lesson_id}/${category_id}/update?lesson_name=${lesson_name}`}
          >
            更新日順
          </NavLink>
          <NavLink
            activeClassName="SelectedOrder"
            className="p-2"
            to={`/items/${lesson_id}/${category_id}/likes?lesson_name=${lesson_name}`}
          >
            いいね順
          </NavLink>
        </div>

        <div className="Items">
          {items.map((item, index) => (
            <div key={index} className="Item">
              <Link
                className="font-bold"
                to={`/items/${category_id}/${item.item_id}`}
              >
                {item.title}
              </Link>
              <div className="ImagePosition">
                <div>
                  <img
                    className="ItemListImage"
                    src={item.image_url}
                    alt="画像を表示できません"
                  />
                </div>
                <div className="ItemListData">
                  <ul>
                    <li>登録者：{item.registrant}</li>
                    <li>
                      登録日:
                      {item.registration_date
                        .replace("T", " ")
                        .replace("+09:00", "")}
                    </li>
                    <li>
                      更新日:
                      {item.update_date.replace("T", " ").replace("+09:00", "")}
                    </li>
                    <li>
                      <div className="heart-solid icon"></div>
                      <div className="HeartNum">{item.likes}</div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <br /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
