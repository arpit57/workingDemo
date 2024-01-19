import db from "../firebase/firebase";

export function ifTransactionData(user, setData, setLoading) {
  db.collection("transactions")
    .doc(user.email)
    .collection("transactions")
    .onSnapshot((snapshot) => {
      setData(snapshot.docs);
      setLoading(false);
    });
}
