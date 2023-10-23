import React from 'react';
import logo from './logo.svg';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <LoginForm />
      <SignUpForm />
      {/* ログインしていないと見られないコンテンツは、loginUserがnullの場合表示しない */}
      {loginUser ? <Content /> : null}
    </div>
  );
}

export default App;
