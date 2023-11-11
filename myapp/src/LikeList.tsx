import { Header } from "./Header";
import { LessonList } from "./LessonList";
import { GetUserData } from "./User";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/LikeList.css";
import { Pagination, MantineProvider } from "@mantine/core";

export const LikeList = () => {
  type LikedItem = {
    item_id: string;
    title: string;
    registrant: string;
    registration_date: string;
    update_date: string;
    likes: number;
    category_id: string;
    image_url: string;
  };
  const [activePage, setPage] = useState(1);

  const user_id = GetUserData().user_id;

  //いいねしたアイテム一覧取得
  const [items, setItems] = useState<LikedItem[][]>([]);
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
    fetchItems();
  }, []);

  return (
    <MantineProvider>
      <Header />
      <LessonList />

      <div className="LikeList">
        <h2>いいねしたアイテム一覧</h2>
        <div className="Items">
          {items[activePage - 1]
            ? items[activePage - 1].map((item, index) => (
                <div key={index} className="LikeItem">
                  <Link
                    className="font-bold hover:text-gray-500"
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
