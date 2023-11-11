import { useHistory, Link, Redirect } from "react-router-dom";
import { signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useAuthContext } from "./provider/AuthProvider";
import { DeleteUserData } from "./User";
import "./style/Header.css";
import { Button, Input, MantineProvider } from "@mantine/core";
import { useState } from "react";

export const Header = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  const logout = () => {
    const isConfirmed = window.confirm("ログアウトしますか？");

    if (isConfirmed) {
      signOut(fireAuth)
        .then(() => {
          //セッションストレージからユーザー情報削除
          DeleteUserData();
          history.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      return;
    }
  };

  //空文字列はバリデーションかける
  const [titleStr, setTitleStr] = useState("");
  const searchItems = () => {
    if (titleStr === "") {
      return;
    }
    history.push(`/items/search?title_string=${titleStr}`);
  };

  return (
    <MantineProvider>
      <header>
        <div className="container mx-auto flex p-5 flex-col md:flex-row items-center">
          {/* items center：一直線上に横に並べる　 */}
          <Link to="/home">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">UTTC KNOWLEDGE BASE</span>
            </a>
          </Link>
          {user ? (
            <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <div className="mr-10">
                <form className="flex items-center">
                  <Input
                    className="w-60"
                    placeholder="フリーワード検索"
                    type={"text"}
                    value={titleStr}
                    onChange={(e) => setTitleStr(e.target.value)}
                  />
                  <Button
                    className="ml-1"
                    variant="default"
                    type={"button"}
                    size="xs"
                    onClick={searchItems}
                  >
                    検索
                  </Button>
                </form>
              </div>
            </div>
          ) : null}

          {/* <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav> */}
          {user ? (
            <button
              onClick={logout}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              ログアウト
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          ) : null}
        </div>
      </header>
    </MantineProvider>
  );
};
