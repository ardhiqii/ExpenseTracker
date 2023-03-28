import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses.contex";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (e) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler(){
    setError(null)
  }

  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (expense.date = date7DaysAgo) && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallbackText={"No Expenses registered for the last 7 days."}
    />
  );
}
export default RecentExpenses;
