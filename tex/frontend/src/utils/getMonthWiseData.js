import db from "../firebase/firebase";

export function getMonthWiseData(
  user,
  setTransactionDate,
  setIncomeData,
  setExpenseData
) {
  db.collection("transactions")
    .doc(user.email)
    .collection("transactions")
    .orderBy("date", "asc")
    .onSnapshot((snapshot) => {
      let dbData = snapshot.docs.map((doc) => doc.data());

      const monthYearMap = {};
      const incomeMap = {};
      const expenseMap = {};

      dbData.forEach((transaction) => {
        const date = new Date(transaction.date.seconds * 1000);
        const monthYear = `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`;

        if (transaction.type === "income") {
          if (!incomeMap[monthYear]) {
            incomeMap[monthYear] = 0;
          }
          incomeMap[monthYear] += transaction.amount;
        } else if (transaction.type === "expense") {
          if (!expenseMap[monthYear]) {
            expenseMap[monthYear] = 0;
          }
          expenseMap[monthYear] += transaction.amount;
        }

        monthYearMap[monthYear] = true;
      });

      const monthYearList = Object.keys(monthYearMap).sort((a, b) => {
        const aDate = new Date(`${a} 1, 2000`);
        const bDate = new Date(`${b} 1, 2000`);
        return aDate - bDate;
      });
      setTransactionDate(monthYearList);

      const incomeList = monthYearList.map(
        (monthYear) => incomeMap[monthYear] || 0
      );
      setIncomeData(incomeList);

      const expenseList = monthYearList.map(
        (monthYear) => expenseMap[monthYear] || 0
      );
      setExpenseData(expenseList);
    });
}
