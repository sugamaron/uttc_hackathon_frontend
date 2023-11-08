import { Link } from "react-router-dom";
import { LessonList } from "./LessonList";
import { Header } from "./Header";
import { GetUserData, UserDataType } from "./User";
import "./style/Profile.css";
import { useState, useEffect } from "react";

export const Home = () => {
  //ユーザー情報を保存するstate
  //undefined型にならないように初期値に適当な値設定する

  const [userProfile, setUserProfile] = useState<UserDataType>({
    user_id: "guest",
    user_name: "guest",
    email: "guest@gmail.com",
    term: -1,
  });

  //sessionStorageからログイン中のユーザー情報取得
  const fetchUserData = () => {
    const userData = GetUserData();
    setUserProfile(userData);
  };

  type RankingItem = {
    item_id: string;
    title: string;
    likes: number;
    category_id: string;
  };

  const [rankingItem, setRankingItem] = useState<RankingItem[]>([]);

  const fetchRanking = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/ranking`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch items: ${res.status}`);
      }

      const items: RankingItem[] = await res.json();
      setRankingItem(items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchRanking();
  }, []);

  return (
    <div>
      <Header />
      <LessonList />

      <div className="Profile">
        <div>
          <h1>HOME</h1>
          <h1>Welcome! {userProfile.user_name}!</h1>
        </div>
        {/* <div>
          <ul className="UserProfile">
            <li>{userProfile.user_name}</li>
            <li>{userProfile.term}期生</li>
          </ul>
        </div> */}

        <div className="flex">
          <div className="ProfileList">
            <div className="p-5">
              <Link to={`/users/edit/${userProfile.user_id}`}>
                ユーザー情報変更
              </Link>
            </div>
            <div className="p-5">
              <Link to="/items/likes">いいねしたアイテム</Link>
            </div>
            <div className="p-5">
              <Link to="/items/register">アイテム登録</Link>
            </div>
          </div>

          <div className="ItemRanking">
            <h2>人気ランキング</h2>
            {rankingItem.map((item, index) => (
              <div key={index} className="p-2">
                <Link
                  className="font-bold"
                  to={`/items/${item.category_id}/${item.item_id}`}
                >
                  {index + 1}位<div className="p-1">{item.title}</div>
                </Link>
                <div className="heart-solid icon"></div>
                <div className="HeartNum">{item.likes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
