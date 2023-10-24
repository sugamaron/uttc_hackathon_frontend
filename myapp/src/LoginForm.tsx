import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";
import { useState } from "react";

export const LoginForm = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const auth = getAuth();

    const login = () => {
        var authenticated = true;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("ログイン:" + user.email)
        })
        .catch((error) => {
            authenticated = false;
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ":" + errorMessage)
        });

        if (authenticated) {
            return(
                <BrowserRouter>
                    <Redirect to = "/lessons" />
                </BrowserRouter>
            )
        }
    }

  /**
   * ログアウトする
   */
    const logOut = () => {
        signOut(fireAuth).then(() => {
        alert("ログアウトしました");
        }).catch(err => {
        alert(err);
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('登録');
      };

  return (
    <div>
      <h3>アカウントをお持ちの方</h3>
      <form onSubmit={handleSubmit}>
        <label>メールアドレス</label>
        <input
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label>パスワード</label>
        <input
            type={"text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        
            <button onClick={login}>ログイン</button>
        
      </form>
        <button onClick={logOut}>ログアウト</button>
    </div>
  );
};