import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { LessonList } from "./LessonList";
import { Profile } from "./Profile";
import { ItemList } from "./ItemList";

export const Home = () => {
  return (
    <BrowserRouter>
      <h1>UTTC Knowledge base</h1>
      <p>
        <LessonList />
      </p>
      <Switch>
        <Route path="/home">
          <Profile />
        </Route>
        <Route path="/items/:lesson_id/:category_id/:sort">
          <ItemList />
        </Route>
      </Switch>
    </BrowserRouter>
    //ヘッダー、章一覧とルーティング設定
  );
};
