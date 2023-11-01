import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style/LessonList.css";

type Lesson = {
  lesson_id: string;
  lesson_name: string;
};

export const LessonList = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const fetchLessons = async () => {
    try {
      const res = await fetch(
        "https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/lessons",
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch lessons: ${res.status}`);
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
    <div className="LessonList">
      {lessons.map((lesson, index) => (
        <div key={index}>
          <Link
            to={`/items/${lesson.lesson_id}/blog/registration?lesson_name=${lesson.lesson_name}`}
          >
            {lesson.lesson_name}
          </Link>
        </div>
      ))}
      <Link to="/home">ホームに戻る</Link>
    </div>
  );
};
