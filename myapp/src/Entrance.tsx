import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUp";
import { Header } from "./Header";
import "./style/Entrance.css";

export const Entrance = () => {
  return (
    <div>
      <Header />
      <div className="Entrance">
        <Link to="/login" className="EntranceLink">
          アカウントをお持ちの方
        </Link>
        <Link to="/signup" className="EntranceLink">
          アカウントをお持ちでない方
        </Link>
      </div>
    </div>
  );
};
