import db from "../firebase/firebase";
import firebase from "firebase/app";

export function addExpense(user, values, randomId, handleClose) {
  db.collection("transactions")
    .doc(user.email)
    .collection("transactions")
    .add({
      id: randomId,
      title: values.title,
      category: values.category,
      description: values.description,
      amount: values.amount,
      type: values.type.toLowerCase(),
      date: new Date(values.date),
    });

  db.collection("activities")
    .doc(user.email)
    .collection("activities")
    .add({
      title: `You added a transaction: ${values.title}`,
      date: firebase.firestore.Timestamp.now(),
    });

  handleClose();
}
