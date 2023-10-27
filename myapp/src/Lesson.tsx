import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const ItemList = () => {
  type Lesson = {
    lesson_id: string;
    lesson_name: string;
  };
  type Category = {
    category_id: string;
    category_name: string;
  };

  const [lessons, setLessons] = useState<Lesson[]>([]);

  const fetchLessons = async () => {
    try {
      const res = await fetch(
        "https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/items",
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch items: ${res.status}`);
      }

      const lessons: Lesson[] = await res.json();
      setLessons(lessons);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <BrowserRouter>
      <div>
        {lessons.map((lesson) => (
          <div>
            <Link to={""} />
          </div>
        ))}
      </div>
    </BrowserRouter>
  );
};
