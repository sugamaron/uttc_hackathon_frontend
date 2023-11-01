import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import { LessonList } from "./LessonList";
import { Profile } from "./Profile";
import { Header } from "./Header";

export const Home = () => {
  return (
    <div>
      <Header />
      <LessonList />

      <Profile />
    </div>
  );
};
