import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUp";
import { Header } from "./Header";
import "./style/Entrance.css";

export const Entrance = () => {
  return (
    <div>
      <Header />
      <p className="Entrance">
        <Link to="/login" className="Link">
          アカウントをお持ちの方
        </Link>
        <Link to="/signup" className="Link">
          アカウントをお持ちでない方
        </Link>
      </p>
    </div>
  );
};
