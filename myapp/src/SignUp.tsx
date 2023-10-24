import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const SignUpForm = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userName, setUserName ] = useState('')
  const [ term, setTerm ] = useState(0)

  const auth = getAuth();

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("登録ユーザー:" + user.email)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ":" + errorMessage)
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('登録');
  };

  return (
    <div>
    <h3>アカウントをお持ちでない方</h3>
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
    <label>ユーザ-名</label>
    <input
      type={"text"}
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
    />
    <label>期</label>
    <input
      type={"number"}
      value={term}
      onChange={(e) => setTerm(Number(e.target.value))}
    />
    <button onClick={signup}>登録</button>
    </form>
    </div>
    )
}