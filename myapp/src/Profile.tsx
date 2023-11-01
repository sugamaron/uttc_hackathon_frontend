import { Link } from "react-router-dom";
import { GetUserData } from "./User";
import "./style/Profile.css";

export const Profile = () => {
  const userProfile = GetUserData();

  return (
    <div className="Profile">
      <h1>Welcome! {userProfile.user_name}</h1>
      <h2>HOME</h2>
      <Link to={`/users/edit/${userProfile.user_id}`}>ユーザー情報変更</Link>
      <p>いいねしたアイテム</p>
      <Link to="/items/register">アイテム登録</Link>
      <p>ログアウト</p>
    </div>
  );
};
