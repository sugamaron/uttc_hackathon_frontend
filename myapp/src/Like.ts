

export const RegisterLike = async(itemId: string, userId: string) => {
        try {
          const res = await fetch(
            `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/likes`,
            { method: "POST",
            body: JSON.stringify({
              user_id: userId,
              item_id: itemId,
            }), }
          );
          if (!res.ok) {
            throw Error(`Failed to register like: ${res.status}`);
          }
         
        } catch (err) {
          console.error(err);
        }
    return
}

export const DeleteLike = async(itemId: string, userId: string) => {
        try {
          const res = await fetch(
            `https://uttc-hackathon-backend-4a3g6srehq-uc.a.run.app/likes?user_id=${userId}&item_id=${itemId}`,
            { method: "DELETE" }
          );
          if (!res.ok) {
            throw Error(`Failed to delete like: ${res.status}`);
          }
        } catch (err) {
          console.error(err);
        }
    return
}
