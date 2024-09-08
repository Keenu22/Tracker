import { useEffect, useRef, useState } from "react";
import styles from "./Expense.module.css";
import ExpensesModal from "./ExpensesModal";

export default function Expense({ setBalance, balance, onModalStateChange, addTransaction, transactions }) {
  const modalRef = useRef(null);
  const [expense, setExpense] = useState(0);

  // Initialize balance and expense from localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    const storedExpense = localStorage.getItem('expense');

    if (storedBalance) {
      setBalance(parseFloat(storedBalance));  // Convert to number if present
    }
    
    if (storedExpense) {
      setExpense(parseFloat(storedExpense));  // Convert to number if present
    }
  }, [setBalance]);  // Only run this effect on the initial mount

  // Recalculate total expenses whenever transactions change and store in localStorage
  useEffect(() => {
    const totalExpenses = transactions.reduce((acc, item) => acc + item.price, 0);
    setExpense(totalExpenses);
    localStorage.setItem('expense', totalExpenses);  // Store expense in localStorage
  }, [transactions]);

  // Store balance in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('balance', balance);  // Store balance in localStorage
  }, [balance]);

  function handleExpense() {
    if (modalRef.current) {
      modalRef.current.open();
      if (typeof onModalStateChange === "function") {
        onModalStateChange(true);
      }
    }
  }

  function handleCloseModal() {
    if (modalRef.current) {
      modalRef.current.close();
      if (typeof onModalStateChange === "function") {
        onModalStateChange(false);
      }
    }
  }

  const handleAddExpense = (title, price, category, date) => {
    // Check if the balance is sufficient
    if (balance < price) {
      alert("Out of balance");
      return; // Exit the function if balance is insufficient
    }

    // Ensure setBalance is defined and use it to update the balance
    if (setBalance) {
      setBalance((prevBalance) => {
        const newBalance = prevBalance - price;
        localStorage.setItem('balance', newBalance);  // Store updated balance
        return newBalance;
      });
    } else {
      console.error("setBalance is not defined");
    }

    // Create the new transaction object
    const newTransaction = {
      name: title,
      date,
      category,
      price,
      id: Date.now(),
    };

    // Call the addTransaction function to add the transaction to the parent state
    addTransaction(newTransaction);

    handleCloseModal(); // Close the modal after adding the expense
  };

  return (
    <div>
      <div className={styles.card}>
        <p>Expenses: Rs.{expense}</p>
        <button className={styles.btn} onClick={handleExpense}>
          + Add Expense
        </button>
      </div>
      <ExpensesModal
        ref={modalRef}
        onClose={handleCloseModal}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
}
