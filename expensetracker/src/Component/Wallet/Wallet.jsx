import { useRef, useState } from "react";
import Expense from "../Expenses/Expense";
import styles from "./Wallet.module.css";
import WalletModal from "./WalletModal";

export default function Wallet({ onModalStateChange ,addTransaction,transactions }) {
  const walletRef = useRef(null);
  // const setBalanceRef = useRef(null); // Create a ref for setBalance
  const [balance, setBalance] = useState(5000); // Default balance

  // Set the ref to the setBalance function
  // setBalanceRef.current = setBalance; //link the ref to the updating state

  const handleIncome = () => {
    if (walletRef.current) {
      walletRef.current.open();
      if (typeof onModalStateChange === 'function') {
        onModalStateChange(true); // Notify parent about modal state
      }
    }
  };

  const handleClose = () => {
    if (walletRef.current) {
      walletRef.current.close();
      if (typeof onModalStateChange === 'function') {
        onModalStateChange(false); // Notify parent about modal state
      }
    }
  };

  const handleAddBalance = (amount) => {
    setBalance((prevBalance) => prevBalance + amount); // Update balance
    handleClose(); // Close modal after adding balance
  };

  return (
    <>
      <div className={styles.card}>
        <p>Wallet Balance: Rs.{balance}</p>
        <button className={styles.btn} onClick={handleIncome}>
          + Add Income
        </button>
        <WalletModal ref={walletRef} onClose={handleClose} onAddBalance={handleAddBalance} />
      </div>
      
      {/* Pass setBalanceRef to Expense */}
      <Expense setBalance={setBalance} balance={balance} onModalStateChange={onModalStateChange}  addTransaction={addTransaction} transactions={transactions} />
    </>
  );
}
