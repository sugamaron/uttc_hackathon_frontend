import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
    <BrowserRouter>
      <h1>UTTCナレッジベース</h1>
      <Link to="/login">アカウントをお持ちの方</Link>
      <Link to="/signup">アカウントをお持ちでない方</Link>

      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>

    </BrowserRouter>
  );
}

export default App;
