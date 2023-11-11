import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import "./style/ItemList.css";
import { Header } from "./Header";
import { Pagination, MantineProvider } from "@mantine/core";

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

  const [activePage, setPage] = useState(1);

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
  const [items, setItems] = useState<Item[][]>([]);
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
      //アイテムを5個ずつの配列に分ける
      const item5 = [];
      for (let i = 0; i < items.length; i += 5) {
        item5.push(items.slice(i, i + 5));
      }
      setItems(item5);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, [lesson_id, category_id, order]);

  return (
    <MantineProvider>
      <Header />
      <LessonList />

      <div className="ItemList">
        <h2>{lesson_name}</h2>
        <div className="Categories">
          {categories.map((category, index) => (
            <div className="CategoryBorder">
              <NavLink
                className="CategoryLink"
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
            className="p-2 transition duration-300 hover:text-gray-500"
            to={`/items/${lesson_id}/${category_id}/registration?lesson_name=${lesson_name}`}
          >
            登録日順
          </NavLink>
          <NavLink
            activeClassName="SelectedOrder"
            className="p-2 transition duration-300 hover:text-gray-500"
            to={`/items/${lesson_id}/${category_id}/update?lesson_name=${lesson_name}`}
          >
            更新日順
          </NavLink>
          <NavLink
            activeClassName="SelectedOrder"
            className="p-2 transition duration-300 hover:text-gray-500"
            to={`/items/${lesson_id}/${category_id}/likes?lesson_name=${lesson_name}`}
          >
            いいね順
          </NavLink>
        </div>

        <div className="Items">
          {items[activePage - 1]
            ? items[activePage - 1].map((item, index) => (
                <div key={index} className="Item">
                  <Link
                    className="font-bold hover:text-gray-500"
                    to={`/items/${category_id}/${item.item_id}`}
                  >
                    {item.title}
                  </Link>
                  <div className="ImagePosition">
                    {/* <img
                  className="ItemListImage"
                  src={item.image_url}
                  alt="画像を表示できません"
                /> */}
                    <img
                      className={
                        category_id == "book"
                          ? "ItemListImageBook"
                          : "ItemListImage"
                      }
                      src={item.image_url}
                      alt="画像を表示できません"
                    />

                    <div className="ItemListData">
                      <ul>
                        登録者：
                        <Link
                          className="hover:text-gray-500"
                          to={`/users/${item.registrant}`}
                        >
                          {item.registrant}
                        </Link>
                        <li>
                          登録日:
                          {item.registration_date
                            .replace("T", " ")
                            .replace("+09:00", "")
                            .substring(0, 16)}
                        </li>
                        <li>
                          更新日:
                          {item.update_date
                            .replace("T", " ")
                            .replace("+09:00", "")
                            .substring(0, 16)}
                        </li>
                        <li>
                          <div className="heart-solid icon"></div>
                          <div className="HeartNum">{item.likes}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={items.length}
          className="mb-8"
        />
      </div>
    </MantineProvider>
  );
};
