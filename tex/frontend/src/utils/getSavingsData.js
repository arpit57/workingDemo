import db from "../firebase/firebase";

export function getSavingsData(user, setTransactionDate, setSavingsData) {
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
      const calculateSavings = (data) => {
        const savings = {};
        data.forEach((item) => {
          const date = new Date(item.date.seconds * 1000);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear();

          if (item.type === "income") {
            if (!savings[`${month} ${year}`]) {
              savings[`${month} ${year}`] = 0;
            }
            savings[`${month} ${year}`] += item.amount;
          } else if (item.type === "expense") {
            if (!savings[`${month} ${year}`]) {
              savings[`${month} ${year}`] = 0;
            }
            savings[`${month} ${year}`] -= item.amount;
          }
        });

        const savingsArray = Object.values(savings);
        return savingsArray;
      };

      const savings = calculateSavings(dbData);
      setSavingsData(savings);
    });
}
