import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import "./style/ItemDetail.css";
import { Header } from "./Header";
import { DeleteLike, RegisterLike } from "./Like";
import { GetUserData } from "./User";

export const ItemDetailBlog = () => {
  const history = useHistory();

  //パスパラメータitem_id取得
  const { item_id } = useParams<{
    item_id: string;
  }>();

  type ItemDetail = {
    title: string;
    registrant: string;
    registration_date: string;
    updater: string;
    update_date: string;
    description: string;
    url: string;
    likes: number;
    image_url: string;
  };

  //アイテム詳細取得
  const [item, setItem] = useState<ItemDetail[]>([]);
  const fetchItemDetail = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/${item_id}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch item detail: ${res.status}`);
      }

      const item: ItemDetail[] = await res.json();
      setItem(item);
    } catch (err) {
      console.error(err);
    }
  };

  //アイテム削除ボタン
  const DeleteItem = async () => {
    const isConfirmed = window.confirm("本当に削除しますか？");

    if (isConfirmed) {
      try {
        const result = await fetch(
          `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/${item_id}`,
          { method: "DELETE" }
        );
        if (!result.ok) {
          throw Error(`Failed to delete item: ${result.status}`);
        }
        alert("アイテムを削除しました。");
        history.push("/home");
      } catch (err) {
        console.error(err);
      }
    } else {
      return;
    }
  };

  //ユーザーがアイテムにいいねしているかどうか判定
  type Distinguish = {
    result: boolean;
  };
  const [liked, setLiked] = useState(true);
  const DistinguishLike = async (itemId: string, userId: string) => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/likes?user_id=${userId}&item_id=${itemId}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to get like: ${res.status}`);
      }
      const likeBool: Distinguish = await res.json();
      setLiked(likeBool.result);
    } catch (err) {
      console.error(err);
    }
  };

  //ユーザーのid取得
  const userId = GetUserData().user_id;

  //いいねボタン押したとき
  const PushLike = () => {
    RegisterLike(item_id, userId);
    alert("いいねしました");
    setLiked(true);
  };

  //いいね済みで、いいね解除ボタン押したとき
  const PushNotLike = () => {
    DeleteLike(item_id, userId);
    alert("いいねを消しました");
    setLiked(false);
  };

  useEffect(() => {
    DistinguishLike(item_id, userId);
  }, []);

  useEffect(() => {
    fetchItemDetail();
  }, [liked]);

  return (
    <div>
      <Header />

      <LessonList />

      <div className="ItemDetail">
        {item.map((i, index) => (
          <div key={index}>
            <h2>{i.title}</h2>

            <div className="Date">
              <div className="flex">
                <p className="p-2">登録者：{i.registrant}</p>
                <p className="p-2">
                  登録日：
                  {i.registration_date.replace("T", " ").replace("+09:00", "")}
                </p>
              </div>
              <div className="flex">
                <p className="p-2">更新者：{i.updater}</p>
                <p className="p-2">
                  更新日：
                  {i.update_date.replace("T", " ").replace("+09:00", "")}
                </p>
              </div>
            </div>

            <div className="Description">{i.description}</div>

            <div className="flex justify-center">
              <img
                className="BlogImage"
                src={i.image_url}
                alt="画像が表示できません"
              />
            </div>

            <div className="Url">
              <a href={i.url}>ブログを読む</a>
            </div>

            <div className="Menu">
              <div className="flex">
                <div className="text-red-400">{i.likes}</div>
                {liked ? (
                  <div>
                    <div className="heart-solid icon"></div>
                    <button
                      className="transform translate-x-5"
                      onClick={PushNotLike}
                    >
                      いいねを消す
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="heart icon"></div>
                    <button
                      className="transform translate-x-5"
                      onClick={PushLike}
                    >
                      いいねする
                    </button>
                  </div>
                )}
              </div>
              <div>
                <Link to={`/items/edit/${item_id}`}>このアイテムを編集</Link>
              </div>

              <div>
                <button onClick={DeleteItem} className="text-red-600">
                  このアイテムを削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
