import { Header } from "./Header";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const LikeList = () => {
  type LikedItem = {
    item_id: string;
    title: string;
    registrant: string;
    registration_date: string;
    update_date: string;
    likes: number;
    category_id: string;
  };

  const user_id = GetUserData().user_id;

  //いいねしたアイテム一覧取得
  const [items, setItems] = useState<LikedItem[]>([]);
  const fetchItems = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/likes?user_id=${user_id}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch items: ${res.status}`);
      }

      const items: LikedItem[] = await res.json();
      setItems(items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <Header />
      <LessonList />

      {items.map((item, index) => (
        <div key={index}>
          <Link to={`/items/${item.category_id}/${item.item_id}`}>
            {item.title}
          </Link>
          <ul>
            <li>登録者：{item.registrant}</li>
            <li>登録日:{item.registration_date}</li>
            <li>更新日:{item.update_date}</li>
            <li>いいね数:{item.likes}</li>
          </ul>
          <br />
        </div>
      ))}
    </div>
  );
};
