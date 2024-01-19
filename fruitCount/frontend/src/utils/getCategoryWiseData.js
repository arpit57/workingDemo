import db from "../firebase/firebase";

export function getCategoryWiseData(
  user,
  setTransactionCategory,
  setDonutAmount
) {
  const categories = [];
  const amount = [];

  db.collection("transactions")
    .doc(user.email)
    .collection("transactions")
    .onSnapshot((snapshot) => {
      let dbData = snapshot.docs.map((doc) => doc.data());

      const result = Object.values(
        dbData.reduce((acc, cur) => {
          if (!acc[cur.category]) {
            acc[cur.category] = { category: cur.category, amount: 0 };
          }
          acc[cur.category].amount += cur.amount;
          return acc;
        }, {})
      );

      const resultAmount = result.map((res) => {
        categories.push(res.category);
        setTransactionCategory(categories);
        return amount.push(res.amount);
      });
      setDonutAmount(resultAmount);
    });
}
