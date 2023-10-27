import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./LoginForm";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { fireAuth } from "./firebase";
import { Content } from "./Content";
import { SignUpForm } from "./SignUp";
import { Entrance } from "./Entrance";

function App() {
  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);

  // ログイン状態を監視して、stateをリアルタイムで更新する
  onAuthStateChanged(fireAuth, (user) => {
    setLoginUser(user);
  });

  return (
    <BrowserRouter>
      <h1>UTTC knowledge base</h1>
      <Route exact path="/">
        <Entrance />
      </Route>
    </BrowserRouter>
  );
}

export default App;
