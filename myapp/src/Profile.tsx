import { Link } from "react-router-dom";
import { GetUserData } from "./User";

export const Profile = () => {
  const userProfile = GetUserData();
  return (
    <div>
      <h1>Welcome! {userProfile.user_name}</h1>
      <h2>HOME</h2>
      <p>ユーザー情報変更</p>
      <p>いいねしたアイテム</p>
      <Link to="/items/register">アイテム登録</Link>
    </div>
  );
};
