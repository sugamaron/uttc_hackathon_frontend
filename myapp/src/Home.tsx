import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import { LessonList } from "./LessonList";
import { Profile } from "./Profile";

export const Home = () => {
  return (
    <div>
      <h1>UTTC Knowledge base</h1>

      <LessonList />

      <Profile />
    </div>
  );
};
