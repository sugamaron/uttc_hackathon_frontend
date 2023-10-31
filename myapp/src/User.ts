
export type UserDataType = {
        user_id: string,
        user_name: string,
        email: string,
        term: number
    }
    //ユーザー情報をsessionStorageに保存
export const SetUserData = async(email: string) => {
    try {
      const res = await fetch(
        `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/users/${email}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw Error(`Failed to fetch user: ${res.status}`);
      }

      const user: UserDataType[] = await res.json();
      const userJson = JSON.stringify(user)
      sessionStorage.setItem('userData', userJson)
    } catch (err) {
      console.error(err);
    }
  }; 

  //ユーザー情報をsessionStorageから取得
export const GetUserData = () => {
    const temp = sessionStorage.getItem('userData');
    const userUndefined: UserDataType = {
        user_id: "",
        user_name: "",
        email: "",
        term: 0
    }
    if (temp != null) {
      return JSON.parse(temp) as UserDataType;
    }
    return userUndefined
  }
  
