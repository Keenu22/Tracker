import { useState } from 'react';
import './App.css';
import Part1 from './Component/FirstPart/Part1';
import Part2 from './Component/Part2/Part2';
import { dummyData } from './dummyTransactions'; // Import initial dummy transactions

function App() {
  const [isModalOpen, setModalOpen] = useState(false); // Manage modal state
  const [transactions, setTransactions] = useState(dummyData); // Manage transactions state
  
  // Handles the state change for the expense modal in Part1
  const handleModalStateChange = (isOpen) => {
    setModalOpen(isOpen);
  };

  // Handles the state change for the transaction modal in Part2
  const handleTransactionModalShow = (isItOpen) => {
    setModalOpen(isItOpen);
  };

  // Function to add new transaction (from Part1 - Expense)
  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

   const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className={`App ${isModalOpen ? "blur" : ""}`}>
      {/* Pass modal state and transaction handler to Part1 */}
      <Part1
        onModalStateChange={handleModalStateChange}
        addTransaction={addTransaction} // Pass the function to add transactions
        transactions={transactions}// Pass the transaction list to Part1
      />

      {/* Pass modal state and transactions to Part2 */}
      <Part2
        onTransactionModalShow={handleTransactionModalShow}
        transactions={transactions} // Pass the transaction list to Part2
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
}

export default App;
