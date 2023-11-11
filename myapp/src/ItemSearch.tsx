import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { LessonList } from "./LessonList";
import "./style/ItemSearch.css";

type Item = {
  item_id: string;
  title: string;
  registrant: string;
  registration_date: string;
  update_date: string;
  likes: number;
  image_url: string;
  category_id: string;
};

export const ItemSearch = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const titleString = query.get("title_string");

  //titleString文字列をタイトルに含むアイテム取得
  const [items, setItems] = useState<Item[]>([]);
  const fetchItems = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/search?title_string=${titleString}`,
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
    fetchItems();
  }, [titleString]);

  return (
    <div>
      <Header />
      <LessonList />
      <div className="ItemSearch">
        <h1>検索結果：{titleString}</h1>
        <div className="Items">
          {items.map((item, index) => (
            <div key={index} className="Item">
              <Link
                className="font-bold"
                to={`/items/${item.category_id}/${item.item_id}`}
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
                    <Link to={`/users/${item.registrant}`}>
                      <li>登録者：{item.registrant}</li>
                    </Link>
                    <li>
                      登録日:
                      {item.registration_date
                        .replace("T", " ")
                        .replace("+09:00", "")}
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
          ))}
        </div>
      </div>
    </div>
  );
};
