import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./LoginForm";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { fireAuth } from "./firebase";
import { Content } from "./Content";
import { SignUpForm } from "./SignUp";
import { Entrance } from "./Entrance";
import { Home } from "./Home";
import { ItemList } from "./ItemList";
import { ItemDetailBlog } from "./ItemDetailBlog";
import { ItemDetailBook } from "./ItemDetailBook";
import { ItemDetailMovie } from "./ItemDetailMovie";
import { EditItem } from "./ItemEdit";
import { RegisterItem } from "./ItemRegister";

function App() {
  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);

  // ログイン状態を監視して、stateをリアルタイムで更新する
  onAuthStateChanged(fireAuth, (user) => {
    setLoginUser(user);
  });

  //すべてのルーティングはここに集結!
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Entrance />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/items/:lesson_id/:category_id/:order">
          <ItemList />
        </Route>
        <Route path="/items/blog/:item_id">
          <ItemDetailBlog />
        </Route>
        <Route path="/items/book/:item_id">
          <ItemDetailBook />
        </Route>
        <Route path="/items/movie/:item_id">
          <ItemDetailMovie />
        </Route>
        <Route path="/items/edit/:item_id">
          <EditItem />
        </Route>
        <Route path="/items/register">
          <RegisterItem />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
