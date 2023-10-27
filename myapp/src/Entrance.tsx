import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUp";

export const Entrance = () => {
  return (
    <BrowserRouter>
      <Link to="/login">アカウントをお持ちの方</Link>
      <Link to="/signup">アカウントをお持ちでない方</Link>

      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
    </BrowserRouter>
  );
};
