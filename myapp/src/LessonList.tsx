import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider } from "@mantine/core";
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
    // <div classNameNameName="LessonList">
    //   {lessons.map((lesson, index) => (
    //     <div key={index} classNameName="Link">
    //       <Link
    //         to={`/items/${lesson.lesson_id}/blog/registration?lesson_name=${lesson.lesson_name}`}
    //       >
    //         {lesson.lesson_name}
    //       </Link>
    //     </div>
    //   ))}
    //   <Link to="/home">ホームに戻る</Link>
    // </div>

    // <div classNameName="bg-white">

    //     <div classNameName="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

    //     <div classNameName="relative pl-3 my-5 overflow-y-scroll">
    //         <div classNameName="flex flex-col w-full font-medium">

    //         {lessons.map((lesson, index) => (
    //     <div key={index} classNameName="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
    //       <Link
    //         to={`/items/${lesson.lesson_id}/blog/registration?lesson_name=${lesson.lesson_name}`}
    //       >
    //         {lesson.lesson_name}
    //       </Link>
    //     </div>
    //   ))}

    //             <div classNameName="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
    //             <Link to="/home" classNameName="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">ホームに戻る</Link>
    //             </div>

    //         {/* </div>
    //         </div> */}
    //     </aside>
    //     </div>
    // </div>

    <div className="container flex flex-col mx-auto bg-white">
      <aside
        className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-20 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
        id="sidenav-main"
      >
        <div className="relative pl-3 my-5 overflow-y-scroll">
          <div className="flex flex-col w-full font-medium">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]"
              >
                <Link
                  to={`/items/${lesson.lesson_id}/blog/registration?lesson_name=${lesson.lesson_name}`}
                  className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
                >
                  {lesson.lesson_name}
                </Link>
              </div>
            ))}

            <div className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
              <Link
                to="/home"
                className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
