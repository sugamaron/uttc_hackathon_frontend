import { Header } from "./Header";
import { LessonList } from "./LessonList";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style/UserProfile.css";
import { Pagination, MantineProvider } from "@mantine/core";

type RegisteredItem = {
  item_id: string;
  title: string;
  registrant: string;
  registration_date: string;
  update_date: string;
  likes: number;
  category_id: string;
  image_url: string;
};

type UserData = {
  user_id: string;
  user_name: string;
  email: string;
  term: number;
};

export const UserProfile = () => {
  //パスパラメータuser_name取得
  const { user_name } = useParams<{
    user_name: string;
  }>();
  // const { user_name, page } = useParams<{
  //   user_name: string;
  //   page: string
  // }>();

  const [activePage, setPage] = useState(1);

  //ユーザー情報取得
  const [userData, setUserData] = useState<UserData[]>([]);
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/users?user_name=${user_name}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch user's data: ${res.status}`);
      }

      const user: UserData[] = await res.json();
      setUserData(user);
    } catch (err) {
      console.error(err);
    }
  };

  //ユーザーが登録したアイテム一覧取得
  const [items, setItems] = useState<RegisteredItem[][]>([]);
  const fetchItems = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/register/${user_name}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch items: ${res.status}`);
      }

      const items: RegisteredItem[] = await res.json();
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
    fetchUser();
    fetchItems();
  }, []);

  return (
    <MantineProvider>
      <Header />
      <LessonList />

      <div className="LikeList">
        {userData.length == 0 ? (
          <div>このアカウントはすでに削除されています</div>
        ) : (
          <div></div>
        )}
        {userData.map((user, index) => (
          <div key={index} className="flex items-end mt-5">
            <div className="UserNameProfile">{user.user_name}</div>
            <div className="UserTermProfile">{user.term}期生</div>
          </div>
        ))}
        <h3 className="mt-10 text-lg">登録したアイテム一覧</h3>
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
                        <li>登録者：{item.registrant}</li>
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
