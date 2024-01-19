import db from "../firebase/firebase";

export function getExpenses(user, setRows) {
  db.collection("transactions")
    .doc(user.email)
    .collection("transactions")
    .orderBy("date", "asc")
    .onSnapshot((snapshot) => {
      setRows(snapshot.docs.map((doc) => doc.data()));
    });
}
