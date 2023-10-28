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

function App() {
  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);

  // ログイン状態を監視して、stateをリアルタイムで更新する
  onAuthStateChanged(fireAuth, (user) => {
    setLoginUser(user);
  });

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
