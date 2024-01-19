import db from "../firebase/firebase";

export function getActivitiesData(user, setData) {
  db.collection("activities")
    .doc(user.email)
    .collection("activities")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) => {
      setData(snapshot.docs);
    });
}
