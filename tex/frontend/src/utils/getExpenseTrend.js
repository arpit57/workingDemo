import db from "../firebase/firebase";

export function getExpenseTrend(
  user,
  setExpenseData,
  setTransactionDate,
  setIncomeData
) {
  db.collection("transactions")
    .doc(user.email)
    .collection("transactions")
    .orderBy("date", "asc")
    .onSnapshot((snapshot) => {
      let dbData = snapshot.docs.map((doc) => doc.data());

      const uniqueDates = [
        ...new Set(
          dbData.map((t) => {
            const date = new Date(t.date.seconds * 1000);
            return date.toISOString().substr(0, 7);
          })
        ),
      ];

      setTransactionDate(uniqueDates);

      /////////////
      const incomeByMonth = dbData.reduce((acc, transaction) => {
        const date = new Date(transaction.date.seconds * 1000);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        if (transaction.type === "income") {
          acc[month] = (acc[month] || 0) + transaction.amount;
        } else if (!acc[month]) {
          acc[month] = 0;
        }
        return acc;
      }, {});

      setIncomeData(Object.values(incomeByMonth));

      const expenseByMonth = dbData.reduce((acc, transaction) => {
        const date = new Date(transaction.date.seconds * 1000);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        if (transaction.type === "expense") {
          acc[month] = (acc[month] || 0) + transaction.amount;
        } else if (!acc[month]) {
          acc[month] = 0;
        }
        return acc;
      }, {});

      setExpenseData(Object.values(expenseByMonth));
    });
}
