import { GetUserData } from "./User";

export const Profile = () => {
  const userProfile = GetUserData();
  console.log(userProfile.email);
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>{userProfile.user_name}</h2>
      <h2>HOME</h2>
      <p>ユーザー情報変更</p>
      <p>いいねしたアイテム</p>
      <p>アイテム追加</p>
    </div>
  );
};
