import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import "./style/ItemDetail.css";
import { Header } from "./Header";
import { DeleteLike, RegisterLike } from "./Like";
import { GetUserData } from "./User";

export const ItemDetailMovie = () => {
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

  const DeleteItem = async () => {
    try {
      const result = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/${item_id}`,
        { method: "DELETE" }
      );
      if (!result.ok) {
        throw Error(`Failed to delete item: ${result.status}`);
      }
    } catch (err) {
      console.error(err);
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

            <div className="Movie">
              <iframe
                width="560"
                height="315"
                src={i.url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
              ></iframe>
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
                <button onClick={DeleteItem}>このアイテムを削除</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="ItemDetailMovie">
        {item.map((i, index) => (
          <div key={index}>
            <h2>{i.title}</h2>
            <p>
              {i.registrant} {i.registrationDate}
            </p>
            <p>
              {i.updater} {i.updateDate}
            </p>
            <p>{i.description}</p>
            <iframe
              width="560"
              height="315"
              src={i.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
            ></iframe>
            <p>いいね {i.likes}</p>

            {liked ? (
              <button onClick={PushNotLike}>いいねを消す</button>
            ) : (
              <button onClick={PushLike}>いいね</button>
            )}
            <Link to={`/items/edit/${item_id}`}>編集</Link>
            <button onClick={DeleteItem}>このアイテムを削除</button>
          </div>
        ))}
      </div> */}
    </div>
  );
};
