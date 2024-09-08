import React from 'react';
import Chart from '../Chart/Chart';
import Wallet from '../Wallet/Wallet';
import styles from './Part1.module.css';

export default function Part1({ onModalStateChange, addTransaction,transactions }) {
  return (
    <>
      <h1>Expense Tracker</h1>
      <div className={styles.backdrop}>
        <Wallet 
          onModalStateChange={onModalStateChange}
          addTransaction={addTransaction} // Pass the addTransaction function
          transactions={transactions}
        />
        <Chart transactions={transactions} />
      </div>
    </>
  );
}
