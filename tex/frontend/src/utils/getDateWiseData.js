import db from "../firebase/firebase";

export function getdateWiseData(
  user,
  setIncomeData,
  setExpenseData,
  setTransactionDate
) {
  db.collection("transactions")
    .doc(user.email)
    .collection("transactions")
    .orderBy("date", "asc")
    .onSnapshot((snapshot) => {
      let dbData = snapshot.docs.map((doc) => doc.data());

      const now = new Date();
      const currentMonthTimestamp =
        new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;

      const filteredData = dbData.filter((item) => {
        const itemTimestamp = item.date.seconds;
        return itemTimestamp >= currentMonthTimestamp;
      });

      // set dates for chart
      let date = [];
      filteredData.map((res) => {
        return date.push(res.date.toDate().toLocaleDateString());
      });
      // remove duplicate dates
      let dateArray = [...new Set(date)];
      setTransactionDate(dateArray);

      const incomeByDate = {};
      const expenseByDate = {};

      // Categorize the data by date
      filteredData.forEach((entry) => {
        const dateStr = new Date(
          entry.date.seconds * 1000
        ).toLocaleDateString();
        if (dateArray.includes(dateStr)) {
          if (entry.type === "income") {
            incomeByDate[dateStr] = (incomeByDate[dateStr] || 0) + entry.amount;
          } else if (entry.type === "expense") {
            expenseByDate[dateStr] =
              (expenseByDate[dateStr] || 0) + entry.amount;
          }
        }
      });

      // Add entries for dates with no data
      dateArray.forEach((dateStr) => {
        if (!(dateStr in incomeByDate)) {
          incomeByDate[dateStr] = 0;
        }
        if (!(dateStr in expenseByDate)) {
          expenseByDate[dateStr] = 0;
        }
      });

      // Return the results as arrays
      const incomeArray = dateArray.map((dateStr) => incomeByDate[dateStr]);
      const expenseArray = dateArray.map((dateStr) => expenseByDate[dateStr]);

      setIncomeData(incomeArray);
      setExpenseData(expenseArray);
    });
}
