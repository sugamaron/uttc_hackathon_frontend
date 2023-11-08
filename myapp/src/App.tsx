import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { ComponentType, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUp";
import { Entrance } from "./Entrance";
import { Home } from "./Home";
import { ItemList } from "./ItemList";
import { ItemDetailBlog } from "./ItemDetailBlog";
import { ItemDetailBook } from "./ItemDetailBook";
import { ItemDetailMovie } from "./ItemDetailMovie";
import { EditItem } from "./ItemEdit";
import { RegisterItem } from "./ItemRegister";
import { EditProfile } from "./ProfileEdit";
import { AuthProvider } from "./provider/AuthProvider";
// import { useAuthContext } from "./provider/AuthProvider";
// import { GlobalAuthState } from "./provider/AuthProvider";
import { GetUserAuth } from "./User";
import { LikeList } from "./LikeList";

function App() {
  type Props = {
    component: ComponentType;
    path: string;
  };

  //ログイン状態でない場合はページを表示しないようにする
  const RouteAuthGuard: React.FC<Props> = (props) => {
    const user = GetUserAuth();

    if (user) {
      return <Route path={props.path} component={props.component} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <AuthProvider>
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

          <RouteAuthGuard path="/home" component={Home} />
          <RouteAuthGuard
            path="/items/blog/:item_id"
            component={ItemDetailBlog}
          />
          <RouteAuthGuard
            path="/items/book/:item_id"
            component={ItemDetailBook}
          />
          <RouteAuthGuard
            path="/items/movie/:item_id"
            component={ItemDetailMovie}
          />
          <RouteAuthGuard path="/items/edit/:item_id" component={EditItem} />
          <RouteAuthGuard path="/items/register" component={RegisterItem} />
          <RouteAuthGuard path="/items/likes" component={LikeList} />
          <RouteAuthGuard
            path="/items/:lesson_id/:category_id/:order"
            component={ItemList}
          />
          <RouteAuthGuard path="/users/edit/:user_id" component={EditProfile} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
