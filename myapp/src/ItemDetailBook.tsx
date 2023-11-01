import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import "./style/ItemDetailBlog.css";
import { Header } from "./Header";

export const ItemDetailBook = () => {
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

  type BookDetail = {
    price: number;
  };

  type ItemBookDetail = {
    title: string;
    registrant: string;
    registrationDate: string;
    updater: string;
    updateDate: string;
    description: string;
    url: string;
    likes: number;
    price: number;
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

  //カテゴリ技術書特有のデータ取得
  const [book, setBook] = useState<BookDetail[]>([]);

  const fetchBookDetail = async () => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items/books/${item_id}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch book detail: ${res.status}`);
      }

      const book: BookDetail[] = await res.json();
      setBook(book);
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
    fetchBookDetail();
  }, []);

  return (
    <div>
      <Header />
      <p>
        <LessonList />
      </p>
      <div className="ItemDetailBook">
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
            <p>{book.map((b) => b.price)}円</p>
            <a href={i.url}>購入サイトへ進む</a>
            <p>いいね {i.likes}</p>
            <p>編集</p>
            <button onClick={DeleteItem}>このアイテムを削除</button>
          </div>
        ))}
      </div>
    </div>
  );
};
