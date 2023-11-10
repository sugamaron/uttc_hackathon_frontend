import { Header } from "./Header";
import { LessonList } from "./LessonList";
import { useParams } from "react-router-dom";

export const UserProfile = () => {
  //パスパラメータuser_name取得
  const { user_name } = useParams<{
    user_name: string;
  }>();

  return (
    <div>
      {/* <Header />
      <LessonList /> */}
    </div>
  );
};
