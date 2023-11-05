import { Link } from "react-router-dom";
import { LessonList } from "./LessonList";
import { Header } from "./Header";
import { GetUserData, UserDataType } from "./User";
import "./style/Profile.css";
// import "./style/LessonList.css";
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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      <LessonList />

      <div className="Profile">
        <h1>HOME</h1>
        <h1>Welcome! {userProfile.user_name}</h1>

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
      </div>
    </div>
  );
};
