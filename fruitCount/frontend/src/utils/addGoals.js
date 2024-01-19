import db from "../firebase/firebase";
import firebase from "firebase/app";

export function addGoals(user, values, randomId, handleClose) {
  db.collection("goals")
    .doc(user.email)
    .collection("goals")
    .add({
      id: randomId,
      title: values.title,
      target: values.target,
      alreadySaved: values.alreadySaved,
      date: new Date(values.date),
      note: values.note,
      achieved: values.alreadySaved > values.target ? true : false,
    });

  db.collection("activities")
    .doc(user.email)
    .collection("activities")
    .add({
      title: `You added a goal: ${values.title}`,
      date: firebase.firestore.Timestamp.now(),
    });

  handleClose();
}
