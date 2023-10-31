import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";

export const ItemDetailMovie = () => {
  //パスパラメータitem_id取得
  const { item_id } = useParams<{
    item_id: string;
  }>();

  type ItemDetail = {
    title: string;
    registrant: string;
    registrationDate: string;
    updater: string;
    updateDate: string;
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

  useEffect(() => {
    fetchItemDetail();
  }, []);

  return (
    <div>
      <p>
        <LessonList />
      </p>

      {item.map((i, index) => (
        <div>
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
          <Link to={`/items/edit/${item_id}`}>編集</Link>
          <button onClick={DeleteItem}>このアイテムを削除</button>
        </div>
      ))}
    </div>
  );
};
