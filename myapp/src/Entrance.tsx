import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUp";

export const Entrance = () => {
  return (
    <div>
      <h1>UTTC knowledge base</h1>
      <Link to="/login">アカウントをお持ちの方</Link>
      <Link to="/signup">アカウントをお持ちでない方</Link>
    </div>
  );
};
