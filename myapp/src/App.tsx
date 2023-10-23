import React from 'react';
import './App.css';
import { LoginForm } from './LoginForm';
import { onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { fireAuth } from "./firebase";
import { Content } from "./Content"
import { SignUpForm } from './SignUp';

function App() {
  // stateとしてログイン状態を管理する。ログインしていないときはnullになる。
  const [loginUser, setLoginUser] = useState(fireAuth.currentUser);
  
  // ログイン状態を監視して、stateをリアルタイムで更新する
  onAuthStateChanged(fireAuth, user => {
    setLoginUser(user);
  });

  return (
    <div className="App">
      <LoginForm />
      <SignUpForm />
      {/* ログインしていないと見られないコンテンツは、loginUserがnullの場合表示しない */}
      {loginUser ? <Content /> : null}
    </div>
  );
}

export default App;
